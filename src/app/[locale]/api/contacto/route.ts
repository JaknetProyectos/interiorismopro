import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getTranslations } from "next-intl/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const SUPPORT_EMAIL = "cuentanos@interiorismopro.com"

export async function POST(req: Request) {
  let t;
  try {
    const body = await req.json();

    const {
      locale,
      nombre,
      email,
      telefono,
      mensaje,
      asunto,
    } = body;

    // 1. Cargamos las traducciones usando el locale dinámico y el namespace correcto
    t = await getTranslations({ locale, namespace: "Emails.contactEmail" });

    if (!nombre || !email || !mensaje || !asunto) {
      return NextResponse.json(
        { error: t("errors.missingFields") },
        { status: 400 }
      );
    }

    /* =========================
       📩 EMAIL AL ADMIN
    ========================== */
    const adminHTML = `
    <div style="background:#f5f1eb;padding:40px;font-family:Arial,Helvetica,sans-serif;color:#1e293b">
      <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #e5e7eb">

        <h2 style="color:#0f172a;margin-bottom:10px;font-size:24px">
          ${t("admin.title")}
        </h2>

        <div style="margin:20px 0;padding:16px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0">
          <p><strong>${t("admin.nameLabel")}</strong> ${nombre}</p>
          <p><strong>${t("admin.emailLabel")}</strong> ${email}</p>
          <p><strong>${t("admin.phoneLabel")}</strong> ${telefono || t("admin.notProvided")}</p>
        </div>

        <div style="margin-top:20px;padding:16px;background:#fef2f2;border-radius:12px;border:1px solid #fecaca">
          <p style="margin:0;font-weight:bold;color:#7f1d1d">${t("admin.subjectLabel")}</p>
          <p style="margin:8px 0 0">${asunto}</p>
        </div>

        <div style="margin-top:20px;padding:16px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0">
          <p style="margin:0;font-weight:bold;color:#0f172a">${t("admin.messageLabel")}</p>
          <p style="margin:8px 0 0;line-height:1.6">${mensaje}</p>
        </div>

      </div>
    </div>
    `;

    await resend.emails.send({
      from: `InteriorismoPro <${SUPPORT_EMAIL}>`,
      to: [SUPPORT_EMAIL],
      subject: t("admin.subject", { asunto }),
      html: adminHTML,
    });

    /* =========================
       📩 EMAIL AL CLIENTE
    ========================== */
    const customerHTML = `
    <div style="background:#f5f1eb;padding:40px;font-family:Arial,Helvetica,sans-serif;color:#1e293b">
      <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #e5e7eb">

        <h2 style="color:#0f172a;margin-bottom:8px;font-size:24px">
          ${t("customer.title")}
        </h2>

        <p style="color:#475569;margin-bottom:20px">
          ${t("customer.greetingStart")} <strong>${nombre}</strong>${t("customer.greetingMid")} <strong>InteriorismoPro</strong>${t("customer.greetingEnd")}
        </p>

        <div style="margin:20px 0;padding:16px;background:#fef2f2;border-radius:12px;border:1px solid #fecaca">
          <p style="margin:0;font-weight:bold;color:#7f1d1d">${t("customer.subjectLabel")}</p>
          <p style="margin:8px 0 0">${asunto}</p>
        </div>

        <div style="margin-top:20px;padding:16px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0">
          <p style="margin:0;font-weight:bold;color:#0f172a">${t("customer.messageLabel")}</p>
          <p style="margin:8px 0 0;line-height:1.6">${mensaje}</p>
        </div>

        <p style="margin-top:24px;color:#64748b;font-size:14px">
          ${t("customer.footerText")}
        </p>

        <div style="margin-top:30px;padding-top:20px;border-top:1px solid #e5e7eb">
          <p style="margin:0;font-size:14px;color:#64748b">
            ${t("customer.signature")}
          </p>
        </div>

      </div>
    </div>
    `;

    await resend.emails.send({
      from: `InteriorismoPro <${SUPPORT_EMAIL}>`,
      to: [email],
      subject: t("customer.subject"),
      html: customerHTML,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("❌ Error contacto:", error);

    return NextResponse.json(
      { error: t ? t("errors.internalError") : "Error interno al enviar el mensaje" },
      { status: 500 }
    );
  }
}