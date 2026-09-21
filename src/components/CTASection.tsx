"use client";

import { Link } from "@/i18n/routing";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CTASection() {
  const t = useTranslations("ctaSection");

  return (
    <section className="py-20 px-4 md:px-8 bg-[#ffeaa7]">
      <div className="max-w-5xl mx-auto">

        {/* Tarjeta principal blanca redondeada */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">

          {/* Contenido */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff7675] mb-4">
              {t("eyebrow")}
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
              {t("title")}
            </h2>

            <p className="text-slate-700 font-medium mb-2">
              {t("line1")}
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              {t("line2")}
            </p>
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">

            <Link href={"/contact"}>
              <button className="px-8 py-4 bg-[#55efc4] text-slate-900 font-extrabold uppercase tracking-wider text-sm rounded-full hover:bg-[#00cec9] hover:text-white transition-all duration-300 active:scale-95 shadow-sm">
                {t("button")}
              </button>
            </Link>

            <div className="flex items-center gap-4 px-6 py-3 bg-[#ffeaa7]/30 rounded-2xl border border-[#ffeaa7]">

              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#55efc4] text-slate-900 shrink-0">
                <Phone className="w-5 h-5" />
              </div>

              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#ff7675]">
                  {t("phoneLabel")}
                </p>
                <p className="font-extrabold text-slate-900">
                  +52 1 55 9129 4026
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}