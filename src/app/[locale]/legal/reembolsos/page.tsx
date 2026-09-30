"use client";

import { useLocale } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalStyle from "@/components/LegalStyle";

function LegalEs() {
    return (
        <div className="legal-container">
            <LegalStyle />

            <section>
                <h1>Política de Cancelaciones y Reembolsos</h1>
                <p>MAYEDA, S.A. DE C.V.</p>

                <h2>1. Disposiciones Generales</h2>
                <p>La presente política regula el derecho de los usuarios a cancelar servicios contratados en MAYEDA, S.A. DE C.V., así como la solicitud y procedencia de reembolsos, conforme a la naturaleza digital y personalizada de los productos ofertados. Al contratar cualquier paquete de servicios, el cliente acepta expresamente las condiciones que aquí se establecen, integradas como parte fundamental de la relación comercial.</p>

                <h2>2. Cancelaciones y reembolsos dentro de las primeras 24 horas</h2>
                <p>El usuario podrá solicitar la cancelación total de su compra y el reembolso del monto pagado únicamente si la solicitud se presenta dentro de las primeras 24 horas posteriores a la contratación y pago del servicio digital, siempre y cuando el proceso de ejecución, análisis, elaboración o producción de los entregables no haya comenzado.</p>
                <p>Para tal efecto, deberá escribir al correo oficial de MAYEDA cuentanos@interiorismopro.com, adjuntando comprobante de pago y referencia del servicio adquirido; la solicitud será atendida y validada dentro del plazo máximo establecido en los términos y condiciones.</p>
                <p>En caso de cumplir con los requisitos, MAYEDA efectuará el reembolso íntegro a la misma cuenta y método de pago original desde el cual se realizó la transacción. El usuario reconoce que el reflejo del monto en su saldo depende exclusivamente del banco emisor, agregador de pagos, y los tiempos de procesamiento pueden variar conforme a las políticas de la institución financiera participante.</p>

                <h2>3. Cancelaciones posteriores a 24 horas y servicios ya iniciados</h2>
                <p>Toda cancelación solicitada después del plazo de 24 horas OU una vez iniciado cualquier actividad relacionada con el servicio contratado (levantamiento virtual, análisis, moodboard, planos, recomendaciones, entregables, etc.) queda, sin excepción, sujeta a estudio individual por parte de MAYEDA. La empresa determinará la viabilidad y el monto de reembolso parcial considerando el grado de avance, recursos invertidos, entregables generados y demás circunstancias relevantes.</p>
                <p>En estos casos, el usuario enviará una solicitud escrita al correo oficial; MAYEDA analizará detalladamente el caso y comunicará la resolución en el plazo estipulado en los términos y condiciones. Los reembolsos que procedan serán calculados proporcionalmente y nunca incluirán los costos referidos al trabajo ya entregado, comisiones bancarias, cargos de procesamiento, ni servicios complementarios irreversibles.</p>

                <h2>4. Exclusiones y Limitaciones</h2>
                <p>Los pagos realizados por servicios digitales cuya entrega se haya completado, descargado o puesto a disposición del usuario no generan derecho a reembolso parcial ni total, salvo estricta y documentada responsabilidad imputable a MAYEDA. Quedan excluidos reembolsos por insatisfacción subjetiva, circunstancias ajenas a la empresa, errores de tipo en datos proporcionados por el usuario, o decisiones de compra no fundamentadas.</p>

                <h2>5. Forma y plazo de devolución</h2>
                <p>Todo reembolso aprobado será gestionado de manera digital, regresando el monto correspondiente a la cuenta o tarjeta utilizada al contratar el servicio. MAYEDA no realiza devoluciones en efectivo, transferencia a cuentas diferentes, ni pagos alternativos. El reflejo del reembolso puede variar conforme unidad bancaria, agregador de pagos, y es ajeno al control directo de MAYEDA; en términos generales, la gestión puede tardar desde 3 hasta 30 días naturales dependiendo de la institución financiera involucrada.</p>

                <h2>6. Casos excepcionales y contacto</h2>
                <p>Para todos los servicios especiales, paquetes personalizados, asesorías en equipo, servicios comerciales, renders complejos, y otras variantes especificadas, la política general podrá ajustarse considerando las particularidades y recursos involucrados. MAYEDA se reserva el derecho de ofrecer un reembolso proporcional o acordar alternativas, siempre en protección de los intereses del cliente y de la empresa.</p>
                <p>Toda solicitud deberá dirigirse por escrito al correo oficial (pendiente de confirmación), incluyendo los datos y documentos necesarios para el análisis y resolución del caso. El usuario recibirá constancia de recepción y, a más tardar en los plazos señalados, la resolución definitiva sobre su solicitud.</p>
            </section>
        </div>
    );
}

function LegalEn() {
    return (
        <div className="legal-container">
            <LegalStyle />

            <section>
                <h1>Cancellation and Refund Policy</h1>
                <p>MAYEDA, S.A. DE C.V.</p>

                <h2>1. General Provisions</h2>
                <p>This policy governs the right of users to cancel services contracted with MAYEDA, S.A. DE C.V., as well as the request and approval of refunds, in accordance with the digital and personalized nature of the products offered. By contracting any service package, the client expressly accepts the conditions set forth herein, which are integrated as a fundamental part of the commercial relationship.</p>

                <h2>2. Cancellations and refunds within the first 24 hours</h2>
                <p>The user may request the total cancellation of their purchase and the refund of the amount paid only if the request is submitted within the first 24 hours following the contracting and payment of the digital service, provided that the process of execution, analysis, preparation, or production of the deliverables has not begun.</p>
                <p>For this purpose, the user must write to MAYEDA's official email address cuentanos@interiorismopro.com, attaching proof of payment and the reference of the service purchased; the request will be attended to and validated within the maximum period established in the terms and conditions.</p>
                <p>If the requirements are met, MAYEDA will issue a full refund to the same account and original payment method from which the transaction was made. The user acknowledges that the reflection of the amount in their balance depends exclusively on the issuing bank and the payment aggregator, and processing times may vary in accordance with the policies of the participating financial institution.</p>

                <h2>3. Cancellations after 24 hours and services already initiated</h2>
                <p>Any cancellation requested after the 24-hour period OR once any activity related to the contracted service has begun (virtual survey, analysis, moodboard, plans, recommendations, deliverables, etc.) is, without exception, subject to individual review by MAYEDA. The company will determine the feasibility and the amount of the partial refund considering the degree of progress, resources invested, deliverables generated, and other relevant circumstances.</p>
                <p>In these cases, the user will send a written request to the official email address; MAYEDA will analyze the case in detail and communicate the resolution within the period stipulated in the terms and conditions. Any refunds that proceed will be calculated proportionally and will never include costs related to work already delivered, bank commissions, processing charges, or irreversible complementary services.</p>

                <h2>4. Exclusions and Limitations</h2>
                <p>Payments made for digital services whose delivery has been completed, downloaded, or made available to the user do not generate the right to a partial or total refund, except in the case of strict and documented liability attributable to MAYEDA. Refunds are excluded for subjective dissatisfaction, circumstances beyond the company's control, typographical errors in data provided by the user, or unfounded purchase decisions.</p>

                <h2>5. Form and term of return</h2>
                <p>Every approved refund will be processed digitally, returning the corresponding amount to the account or card used when contracting the service. MAYEDA does not make cash refunds, transfers to different accounts, or alternative payments. The reflection of the refund may vary depending on the banking unit and payment aggregator, and is beyond MAYEDA's direct control; in general terms, processing may take from 3 to 30 calendar days depending on the financial institution involved.</p>

                <h2>6. Exceptional cases and contact</h2>
                <p>For all special services, customized packages, team advisory services, commercial services, complex renders, and other specified variants, the general policy may be adjusted considering the particularities and resources involved. MAYEDA reserves the right to offer a proportional refund or agree on alternatives, always protecting the interests of the client and the company.</p>
                <p>Every request must be directed in writing to the official email address (pending confirmation), including the data and documents necessary for the analysis and resolution of the case. The user will receive acknowledgment of receipt and, no later than the indicated periods, the final resolution regarding their request.</p>
            </section>
        </div>
    );
}

export default function LegalPage() {
    const locale = useLocale();

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <main className="flex-grow container mx-auto px-6 py-20 max-w-4xl">
                {locale === "es" ? <LegalEs /> : <LegalEn />}
            </main>
        </div>
    );
}