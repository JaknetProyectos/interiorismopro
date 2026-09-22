import { formatPrice } from "@/lib/format-price";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_BANNER =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const EMAIL_SUPPORT = "cuentanos@interiorismopro.com";
const EMAIL_LOGO = "https://vexora.com.mx/title.png";

export interface EmailItem {
  id: string;
  price: number;
  quantity: number;
  title?: string;
  image?: string;
  description?: string;
}

export interface ConfirmRequestBody {
  orderId: string;
  amount: number;
  items: EmailItem[];
  customer: {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    estado: string;
    cp: string;
  };
  notes?: string;
}

function buildCustomerHTML(
  orderId: string,
  customer: ConfirmRequestBody["customer"],
  items: EmailItem[],
  total: number
): string {
  const itemsRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px dashed #e4e4e7; text-align: left;">
          <strong style="color: #18181b; font-size: 13px;">${item.title || item.id}</strong>
          ${item.description
          ? `<br/><span style="color: #71717a; font-size: 11px;">${item.description}</span>`
          : ""
        }
        </td>
        <td style="padding: 10px 0; border-bottom: 1px dashed #e4e4e7; text-align: center; color: #3f3f46; font-size: 13px;">
          ${item.quantity}
        </td>
        <td style="padding: 10px 0; border-bottom: 1px dashed #e4e4e7; text-align: right; color: #18181b; font-size: 13px; font-weight: bold;">
          ${formatPrice(item.price * item.quantity)} MXN
        </td>
      </tr>`
    )
    .join("");

  return `
  <!DOCTYPE html>
  <html>
    <head><meta charset="utf-8"/></head>
    <body style="margin: 0; padding: 30px 10px; background-color: #f4f4f5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e4e4e7;">
        <tr>
          <td align="center" style="padding: 30px 20px 20px 20px; background-color: #ffffff; border-bottom: 1px solid #f4f4f5;">
            <img src="${EMAIL_LOGO}" alt="Logo" style="max-height: 42px; width: auto; display: block;" />
          </td>
        </tr>
        <tr>
          <td style="padding: 24px 30px 12px 30px; text-align: center;">
            <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #71717a; font-weight: 600;">Comprobante de compra</p>
            <h2 style="margin: 6px 0 0 0; color: #09090b; font-size: 22px; font-weight: 800;">¡Gracias por tu pago!</h2>
            <p style="margin: 4px 0 0 0; color: #71717a; font-size: 13px;">Orden: <strong>#${orderId}</strong></p>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 30px;">
            <table width="100%" style="background-color: #fafafa; border-radius: 8px; padding: 12px; font-size: 12px; color: #3f3f46;">
              <tr><td><strong>Cliente:</strong> ${customer.nombre} ${customer.apellido}</td></tr>
              <tr><td><strong>Email:</strong> ${customer.email}</td></tr>
              <tr><td><strong>Dirección:</strong> ${customer.direccion}, ${customer.ciudad}, ${customer.estado}</td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 30px;">
            <table width="100%" border="0" cellpadding="0" cellspacing="0">
              <thead>
                <tr style="border-bottom: 2px solid #18181b; text-align: left; font-size: 11px; text-transform: uppercase; color: #71717a;">
                  <th style="padding-bottom: 8px; text-align: left;">Concepto</th>
                  <th style="padding-bottom: 8px; text-align: center;">Cant.</th>
                  <th style="padding-bottom: 8px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>${itemsRows}</tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 30px 24px 30px;">
            <table width="100%" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size: 15px; font-weight: bold; color: #09090b;">Total pagado:</td>
                <td style="font-size: 20px; font-weight: 900; color: #09090b; text-align: right;">
                  ${formatPrice(total)} MXN
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 0;">
            <img src="${EMAIL_BANNER}" alt="Banner" style="width: 100%; height: auto; display: block;" />
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #fafafa; font-size: 11px; color: #a1a1aa; border-top: 1px solid #f4f4f5;">
            Si tienes dudas sobre este cargo contáctanos en <a href="mailto:${EMAIL_SUPPORT}" style="color: #71717a;">${EMAIL_SUPPORT}</a>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

function buildBusinessHTML(
  orderId: string,
  customer: ConfirmRequestBody["customer"],
  items: EmailItem[],
  total: number,
  notes?: string
): string {
  const itemsRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f4f4f5; font-size: 12px;">
          <strong>${item.title || item.id}</strong> (x${item.quantity})
        </td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f4f4f5; font-size: 12px; text-align: right;">
          ${formatPrice(item.price * item.quantity)} MXN
        </td>
      </tr>`
    )
    .join("");

  return `
  <!DOCTYPE html>
  <html>
    <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f5;">
      <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 24px; border-radius: 12px;">
        <h3 style="margin-top: 0; color: #09090b;">Nueva Venta Registrada</h3>
        <p style="font-size: 13px; color: #52525b;">Orden: <strong>#${orderId}</strong></p>
        <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 16px 0;" />
        <h4 style="margin: 0 0 8px 0; font-size: 13px; color: #18181b;">Datos del Cliente:</h4>
        <p style="font-size: 12px; color: #3f3f46; margin: 2px 0;"><strong>Nombre:</strong> ${customer.nombre} ${customer.apellido}</p>
        <p style="font-size: 12px; color: #3f3f46; margin: 2px 0;"><strong>Email:</strong> ${customer.email}</p>
        <p style="font-size: 12px; color: #3f3f46; margin: 2px 0;"><strong>Teléfono:</strong> ${customer.telefono}</p>
        <p style="font-size: 12px; color: #3f3f46; margin: 2px 0;"><strong>Dirección:</strong> ${customer.direccion}, ${customer.ciudad}, ${customer.estado}, CP ${customer.cp}</p>
        ${notes ? `<p style="font-size: 12px; color: #3f3f46; margin: 2px 0;"><strong>Notas:</strong> ${notes}</p>` : ""}
        <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 16px 0;" />
        <h4 style="margin: 0 0 8px 0; font-size: 13px; color: #18181b;">Resumen de Items:</h4>
        <table width="100%" border="0" cellpadding="0" cellspacing="0">${itemsRows}</table>
        <h3 style="text-align: right; margin-top: 16px; color: #09090b;">
          Total: ${formatPrice(total)} MXN
        </h3>
      </div>
    </body>
  </html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body: ConfirmRequestBody = await req.json();

    if (!body.orderId || !body.customer?.email || !body.items) {
      return NextResponse.json(
        { success: false, error: "Datos de confirmación incompletos." },
        { status: 400 }
      );
    }

    const customerHTML = buildCustomerHTML(body.orderId, body.customer, body.items, body.amount);
    const businessHTML = buildBusinessHTML(body.orderId, body.customer, body.items, body.amount, body.notes);

    await Promise.all([
      resend.emails.send({
        from: "InteriorismoPro <cuentanos@interiorismopro.com>",
        to: body.customer.email,
        subject: `Confirmación de compra - ${body.orderId}`,
        html: customerHTML,
      }),
      resend.emails.send({
        from: "InteriorismoPro <cuentanos@interiorismopro.com>",
        to: "cuentanos@interiorismopro.com",
        subject: `Nueva venta - ${body.orderId}`,
        html: businessHTML,
      }),
    ]);

    return NextResponse.json({ success: true, message: "Correos enviados exitosamente." });
  } catch (error: any) {
    console.error("Error enviando correos en /api/confirm:", error);
    return NextResponse.json(
      { success: false, error: "El pago fue exitoso pero falló el envío del correo de confirmación." },
      { status: 500 }
    );
  }
}