import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.TO_EMAIL || "nexixstudio@gmail.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, errors: ["Method not allowed"] });
  }

  const { nombre, empresa, email, telefono, mensaje } = req.body || {};

  // Validation
  const errors: string[] = [];
  if (!nombre || nombre.trim().length < 2)
    errors.push("El nombre es obligatorio (mínimo 2 caracteres).");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.push("Introduce un email válido.");
  if (!mensaje || mensaje.trim().length < 10)
    errors.push("El mensaje es obligatorio (mínimo 10 caracteres).");

  if (errors.length > 0) {
    return res.status(422).json({ ok: false, errors });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({
      ok: false,
      errors: ["Error de configuración del servidor. Intenta por WhatsApp."],
    });
  }

  const htmlBody = `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
      <div style="background:#0f172a;padding:32px 28px;border-radius:12px 12px 0 0;">
        <h1 style="margin:0;color:#06b6d4;font-size:22px;font-weight:700;">NEXIX Studio</h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.6);font-size:14px;">Nuevo mensaje desde nexixstudio.com</p>
      </div>
      <div style="padding:32px 28px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;width:130px;vertical-align:top;">Nombre</td><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#1e293b;font-size:15px;">${nombre}</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;vertical-align:top;">Empresa</td><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#1e293b;font-size:15px;">${empresa || "—"}</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;vertical-align:top;">Email</td><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#1e293b;font-size:15px;"><a href="mailto:${email}" style="color:#06b6d4;text-decoration:none;">${email}</a></td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;vertical-align:top;">Teléfono</td><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#1e293b;font-size:15px;">${telefono || "—"}</td></tr>
          <tr><td style="padding:12px 0;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;vertical-align:top;">Mensaje</td><td style="padding:12px 0;color:#1e293b;font-size:15px;line-height:1.7;">${(mensaje || "").replace(/\n/g, "<br>")}</td></tr>
        </table>
      </div>
      <p style="text-align:center;color:#94a3b8;font-size:12px;margin-top:24px;">Este mensaje fue enviado desde el formulario de contacto de nexixstudio.com</p>
    </div>`;

  try {
    await resend.emails.send({
      from: "NEXIX Studio <onboarding@resend.dev>",
      to: [TO_EMAIL],
      subject: `Nuevo contacto desde nexixstudio.com — ${nombre}`,
      replyTo: email,
      html: htmlBody,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[CONTACTO ERROR]", error);
    return res.status(500).json({
      ok: false,
      errors: ["Error al enviar el mensaje. Intenta de nuevo o escríbenos por WhatsApp."],
    });
  }
}
