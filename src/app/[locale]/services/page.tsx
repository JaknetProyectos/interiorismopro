"use client";

import { useCart } from "@/context/CartContext";
import { Check, ShoppingCart, Phone } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { formatPrice } from "@/lib/format-price";
import { useServices } from "@/hooks/useServices";
import { Service } from "@/types/service";
import { ServiceOption } from "@/types/service-option";


function ServiceCard({ service }: { service: Service }) {
  const { addItem } = useCart();
  const t = useTranslations("servicesPage");

  const handleAddToCart = (option: ServiceOption) => {
    addItem({ id: option.id });
  };

  if (service.id== "custom") {
    return (<></>)
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md border-2 border-slate-100 transition-transform duration-300 hover:shadow-xl">
      <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
        {/* LEFT CONTENT */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <span className="inline-block bg-[#ff7675]/15 text-[#ff7675] text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              {t("serviceBadge")}
            </span>

            <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
              {service.title}
            </h3>

            <p className="text-sm text-slate-600 mb-6 font-medium">
              <span className="font-extrabold text-slate-800">{t("idealForLabel")}</span> {service.idealFor}
            </p>

            <ul className="space-y-3 mb-4">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#55efc4] text-slate-900 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="text-sm text-slate-700 font-medium leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT PANEL (PRICING) */}
        <div className="bg-[#ffeaa7] p-6 md:p-8 flex flex-col justify-center rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl">
          <div className="space-y-4">
            {service.options.map((option) => (
              <div key={option.id} className="bg-white p-5 rounded-2xl border-2 border-slate-100 shadow-sm">
                {option.variant && (
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                    {option.variant}
                  </p>
                )}

                <div className="flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
                  <div>
                    <span className="text-xl md:text-2xl font-black text-slate-900">
                      MXN {formatPrice(option.price)}
                    </span>
                    <span className="text-xs font-bold text-slate-500 ml-1">{t("vat")}</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(option)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff7675] text-white text-sm font-extrabold hover:bg-[#d63031] active:scale-95 transition-all shadow-sm"
                  >
                    <ShoppingCart size={16} />
                    {t("addButton")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const t = useTranslations("servicesPage");
  const { services } = useServices();

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero Banner (Verde Menthol) */}
      <section className="pt-60 pb-48 px-4 md:px-8 bg-[#55efc4]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
            {t("heroTitle")}
          </h1>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 px-4 md:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto space-y-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}

          {/* Personalized Service Card (Naranja / Coral) */}
          <div className="bg-[#ff7675] text-white rounded-3xl p-6 md:p-10 shadow-lg border-4 border-white/20">
            <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">
              {t("personalized.title")}
            </h3>

            <p className="font-semibold text-lg mb-2">
              {t("personalized.line1")}
            </p>

            <p className="text-sm font-medium opacity-90 mb-6">
              {t("personalized.line2")}
            </p>

            <p className="text-sm bg-white/10 p-4 rounded-2xl mb-6 backdrop-blur-sm">
              <span className="font-extrabold text-white block mb-1">{t("personalized.questionLabel")}</span>
              <span className="opacity-95">{t("personalized.questionBody")}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={"/personalizado"}>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-slate-900 font-extrabold hover:bg-[#ffeaa7] transition-all duration-300 shadow-md active:scale-95">
                  <ShoppingCart size={18} className="text-[#ff7675]" />
                  {t("personalized.addToCart")}
                </button>
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-white text-white font-extrabold hover:bg-white hover:text-[#ff7675] transition-all duration-300 active:scale-95"
              >
                {t("personalized.requestQuote")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section (Amarillo Sour Lemon) */}
      <section className="py-16 px-4 md:px-8 bg-white border-t-2 border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#ffeaa7] rounded-3xl p-8 md:p-12 shadow-sm border-2 border-amber-100">
            {/* Content */}
            <div className="max-w-2xl mx-auto text-center mb-10">
              <p className="inline-block bg-white/80 text-[#ff7675] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow-sm">
                {t("cta.eyebrow")}
              </p>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-4 leading-tight tracking-tight">
                {t("cta.title")}
              </h2>

              <p className="text-slate-800 font-bold mb-2">
                {t("cta.line1")}
              </p>

              <p className="text-sm text-slate-700 font-medium leading-relaxed">
                {t("cta.line2")}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
              <Link
                href="/contact"
                className="w-full sm:w-auto text-center px-8 py-3.5 rounded-full bg-[#55efc4] text-slate-900 font-extrabold uppercase tracking-wider text-sm hover:bg-[#00cec9] hover:text-white transition-all duration-300 shadow-md active:scale-95"
              >
                {t("cta.contactButton")}
              </Link>

              <div className="flex items-center gap-4 bg-white rounded-full px-5 py-3 shadow-sm border border-amber-100">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#55efc4]">
                  <Phone className="w-5 h-5 text-slate-900" />
                </div>

                <div className="text-left">
                  <p className="text-xs uppercase tracking-widest text-[#ff7675] font-black">
                    {t("cta.phoneLabel")}
                  </p>
                  <p className="font-extrabold text-slate-900 text-sm">
                    +52 1 55 9129 4026
                  </p>
                </div>
              </div>
            </div>

            {/* Image (integrated) */}
            <div className="flex justify-center border-t-2 border-amber-200/60 pt-8">
              <Image
                src="/flecha.png"
                alt={t("cta.imageAlt")}
                width={260}
                height={320}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}