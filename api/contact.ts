import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

/**
 * POST /api/contact — contact form → email via Resend.
 *
 * Env vars (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY  (required)
 *   TO_EMAIL        inbox that receives the leads (default nexixstudio@gmail.com)
 *
 * Sender uses nexixstudio.com, verified in Resend.
 */

const TO_EMAIL = process.env.TO_EMAIL || "nexixstudio@gmail.com";
const FROM_EMAIL = "NEXIX <contacto@nexixstudio.com>";

const SERVICES = new Set([
  "Sitio web profesional",
  "Automatización con IA",
  "Soluciones a la medida",
  "Estrategia y asesoría",
  "Otro",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WHATSAPP_URL = "https://wa.me/18295234738";

const LIMITS = { nombre: 100, email: 150, telefono: 40, mensaje: 3000 };
const MIN_FILL_MS = 3000; // faster than this is almost certainly a bot

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function str(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

function row(label: string, value: string) {
  return `<tr><td style="padding:12px 0;border-bottom:1px solid #eef1f8;color:#7c849e;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;width:130px;vertical-align:top;">${label}</td><td style="padding:12px 0;border-bottom:1px solid #eef1f8;color:#0b1233;font-size:15px;line-height:1.6;">${value}</td></tr>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, errors: ["Método no permitido."] });
  }

  const body = (typeof req.body === "string" ? safeJson(req.body) : req.body) || {};

  // Spam traps: hidden field must stay empty and the form can't be sent instantly
  const startedAt = Number(body.t);
  if (str(body.website) || (Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS)) {
    return res.status(200).json({ ok: true });
  }

  const nombre = str(body.nombre);
  const email = str(body.email);
  const telefono = str(body.telefono);
  const servicio = str(body.servicio);
  const mensaje = str(body.mensaje);
  const consentimiento = body.consentimiento === true;

  const errors: string[] = [];
  if (nombre.length < 2 || nombre.length > LIMITS.nombre) errors.push("Escribe tu nombre.");
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email)
    errors.push("Escribe un email válido.");
  if (telefono && (telefono.length > LIMITS.telefono || !/^[+\d\s().-]{7,}$/.test(telefono)))
    errors.push("Revisa el número de teléfono.");
  if (servicio && !SERVICES.has(servicio)) errors.push("Selecciona un servicio de la lista.");
  if (mensaje.length < 10 || mensaje.length > LIMITS.mensaje)
    errors.push("Cuéntanos un poco más sobre tu proyecto (mínimo 10 caracteres).");
  if (!consentimiento) errors.push("Debes aceptar la política de privacidad.");

  if (errors.length > 0) {
    return res.status(422).json({ ok: false, errors });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[CONTACT] RESEND_API_KEY is not set");
    return res.status(500).json({
      ok: false,
      errors: ["No pudimos enviar tu mensaje en este momento. Escríbenos por WhatsApp."],
      debug: { status: 500, message: "RESEND_API_KEY no está configurada en el servidor." },
    });
  }

  const e = {
    nombre: escapeHtml(nombre),
    email: escapeHtml(email),
    telefono: escapeHtml(telefono),
    servicio: escapeHtml(servicio),
    mensaje: escapeHtml(mensaje).replace(/\n/g, "<br>"),
  };
  const waDigits = telefono.replace(/[^\d]/g, "");

  const html = `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
      <div style="background:#0b1233;padding:28px;border-radius:14px 14px 0 0;">
        <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:800;letter-spacing:0.08em;">NEXIX</h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.65);font-size:14px;">Nueva solicitud desde nexixstudio.com</p>
      </div>
      <div style="padding:24px 28px;border:1px solid #e6eaf4;border-top:none;border-radius:0 0 14px 14px;">
        <table style="width:100%;border-collapse:collapse;">
          ${row("Nombre", e.nombre)}
          ${row("Email", `<a href="mailto:${e.email}" style="color:#3457ee;text-decoration:none;">${e.email}</a>`)}
          ${row(
            "WhatsApp",
            telefono
              ? `${e.telefono}${waDigits.length >= 10 ? ` · <a href="https://wa.me/${waDigits}" style="color:#16a34a;text-decoration:none;">Abrir chat</a>` : ""}`
              : "—"
          )}
          ${row("Servicio", e.servicio || "—")}
          ${row("Mensaje", e.mensaje)}
        </table>
      </div>
      <p style="text-align:center;color:#9aa3bd;font-size:12px;margin-top:20px;">Responde a este correo para contestarle directamente.</p>
    </div>`;

  const text = [
    `Nombre: ${nombre}`,
    `Email: ${email}`,
    `WhatsApp: ${telefono || "—"}`,
    `Servicio: ${servicio || "—"}`,
    "",
    mensaje,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `Nueva solicitud: ${servicio || "Contacto"} — ${nombre}`,
      html,
      text,
    });
    if (error) {
      console.error("[CONTACT] Resend error", error);
      // Pass Resend's real status + message through so failures can be debugged
      const status = error.statusCode ?? 502;
      return res.status(status >= 400 && status < 600 ? status : 502).json({
        ok: false,
        errors: ["No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp."],
        debug: { status, name: error.name, message: error.message },
      });
    }

    // Confirmation to the client. Their message already reached us, so a
    // failure here is only logged and never fails the response.
    if (EMAIL_RE.test(email)) {
      try {
        const confirmation = await resend.emails.send({
          from: FROM_EMAIL,
          to: [email],
          replyTo: TO_EMAIL,
          subject: "Recibimos tu mensaje – NEXIX Tech Studio",
          html: confirmationHtml(e.nombre.split(" ")[0], e.servicio),
          text: confirmationText(nombre.split(" ")[0], servicio),
        });
        if (confirmation.error) console.error("[CONTACT] Confirmation email error", confirmation.error);
      } catch (confirmErr) {
        console.error("[CONTACT] Confirmation email failed", confirmErr);
      }
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[CONTACT] Unexpected error", err);
    return res.status(500).json({
      ok: false,
      errors: ["No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp."],
      debug: { status: 500, message: err instanceof Error ? err.message : String(err) },
    });
  }
}

function safeJson(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Client confirmation email: table layout + inline styles for email clients. */
function confirmationHtml(firstName: string, servicio: string) {
  const serviceLine = servicio
    ? `<p style="margin:0 0 16px;font-size:15px;line-height:24px;color:#4a5273;">Servicio de interés: <strong style="color:#0b1233;">${servicio}</strong></p>`
    : "";
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Recibimos tu mensaje</title></head>
<body style="margin:0;padding:0;background-color:#f3f5fb;">
  <div style="display:none;max-height:0;overflow:hidden;">Gracias por escribirnos, te responderemos en menos de 24 horas.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f5fb;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
        <tr><td style="background-color:#0b1233;padding:28px 32px;">
          <p style="margin:0;font-size:22px;font-weight:800;letter-spacing:4px;color:#ffffff;">NEXIX</p>
          <p style="margin:6px 0 0;font-size:13px;color:#aebcff;">Tech Studio · Santo Domingo, RD</p>
        </td></tr>
        <tr><td style="height:4px;background-color:#3457ee;line-height:4px;font-size:0;">&nbsp;</td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 16px;font-size:22px;line-height:30px;font-weight:700;color:#0b1233;">¡Hola, ${firstName}!</h1>
          <p style="margin:0 0 16px;font-size:15px;line-height:24px;color:#4a5273;">Gracias por escribirnos. Recibimos tu solicitud y nuestro equipo ya la está revisando.</p>
          ${serviceLine}
          <p style="margin:0 0 24px;font-size:15px;line-height:24px;color:#4a5273;">Te responderemos en <strong style="color:#0b1233;">menos de 24 horas</strong>. Si necesitas algo antes, puedes escribirnos por WhatsApp o responder a este correo.</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
            <td style="border-radius:999px;background-color:#16a34a;">
              <a href="${WHATSAPP_URL}" target="_blank" style="display:inline-block;padding:12px 26px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">Escríbenos por WhatsApp</a>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid #eef1f8;">
          <p style="margin:0;font-size:12px;line-height:18px;color:#9aa3bd;">NEXIX Tech Studio · Diseño web y automatización con IA<br><a href="https://www.nexixstudio.com" style="color:#3457ee;text-decoration:none;">nexixstudio.com</a> · +1 (829) 523-4738</p>
          <p style="margin:8px 0 0;font-size:11px;line-height:16px;color:#b3bad0;">Recibes este correo porque enviaste el formulario de contacto de nexixstudio.com.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function confirmationText(firstName: string, servicio: string) {
  return [
    `¡Hola, ${firstName}!`,
    "",
    "Gracias por escribirnos. Recibimos tu solicitud y nuestro equipo ya la está revisando.",
    servicio ? `Servicio de interés: ${servicio}` : "",
    "",
    "Te responderemos en menos de 24 horas. Si necesitas algo antes, escríbenos por WhatsApp: " + WHATSAPP_URL,
    "",
    "NEXIX Tech Studio · nexixstudio.com · +1 (829) 523-4738",
  ]
    .filter((l, i, a) => !(l === "" && a[i - 1] === ""))
    .join("\n");
}
