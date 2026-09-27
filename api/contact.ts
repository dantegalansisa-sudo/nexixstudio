import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

/**
 * POST /api/contact — contact form → email via Resend.
 *
 * Env vars (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY  (required)
 *   TO_EMAIL        inbox that receives the leads (default nexixstudio@gmail.com)
 *   FROM_EMAIL      sender; must be on a domain verified in Resend.
 *                   Default "NEXIX Studio <onboarding@resend.dev>" only delivers
 *                   to the email of the Resend account owner.
 */

const TO_EMAIL = process.env.TO_EMAIL || "nexixstudio@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "NEXIX Studio <onboarding@resend.dev>";

const SERVICES = new Set([
  "Sitio web profesional",
  "Automatización con IA",
  "Soluciones a la medida",
  "Estrategia y asesoría",
  "Otro",
]);

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
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > LIMITS.email)
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
      return res.status(502).json({
        ok: false,
        errors: ["No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp."],
      });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[CONTACT] Unexpected error", err);
    return res.status(500).json({
      ok: false,
      errors: ["No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp."],
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
