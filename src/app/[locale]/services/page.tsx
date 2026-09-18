"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Check, ShoppingCart, Phone } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { formatPrice } from "@/lib/format-price";
import { useServices } from "@/hooks/useServices";
import { Service } from "@/types/service";
import { ServiceOption } from "@/types/service-option";


function ServiceCard({ service }: { service: Service }) {
  const { addItem } = useCart()
  const t = useTranslations("servicesPage");

  const handleAddToCart = (option: ServiceOption) => {
    addItem({ id: option.id });
  };

  return (
    <div className="border border-[#341f97] bg-white">
      <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
        {/* LEFT CONTENT */}
        <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-[#341f97]">
          <span className="text-xs uppercase tracking-[0.2em] text-[#ee5253] mb-3 block">
            {t("serviceBadge")}
          </span>

          <h3 className="text-2xl font-bold text-[#341f97] mb-2">
            {service.title}
          </h3>

          <p className="text-sm text-[#341f97] mb-6">
            <span className="font-semibold">{t("idealForLabel")}</span> {service.idealFor}
          </p>

          <ul className="space-y-3">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-5 h-5 flex items-center justify-center border border-[#ee5253] text-[#ee5253] mt-1">
                  <Check size={14} />
                </span>
                <span className="text-sm text-[#341f97] leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT PANEL (PRICING) */}
        <div className="bg-[#F8EFBA] p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-5">
            {service.options.map((option) => (
              <div key={option.id} className="border border-[#341f97] bg-white p-4">
                {option.variant && (
                  <p className="text-xs text-[#341f97] mb-2">
                    {option.variant}
                  </p>
                )}

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xl md:text-2xl font-bold text-[#341f97]">
                      MXN {formatPrice(option.price)}
                    </span>
                    <span className="text-xs text-[#341f97] ml-1">{t("vat")}</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(option)}
                    className="flex items-center gap-2 px-4 py-2 border border-[#341f97] bg-[#341f97] text-white text-sm font-semibold hover:bg-[#2c187e] transition-colors"
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
  const { services } = useServices()

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="pt-32 pb-16 px-4 md:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6">
            {t("heroTitle")}
          </h1>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto space-y-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}

          {/* Personalized Service Card */}
          <div className="border border-[#341f97] bg-[#F8EFBA] p-6 md:p-8">
            <h3 className="text-2xl font-bold text-[#341f97] mb-4">
              {t("personalized.title")}
            </h3>

            <p className="text-[#341f97] mb-4">
              {t("personalized.line1")}
            </p>

            <p className="text-sm text-[#341f97] mb-6">
              {t("personalized.line2")}
            </p>

            <p className="text-sm text-[#341f97] mb-6">
              <span className="font-semibold">{t("personalized.questionLabel")}</span><br />
              {t("personalized.questionBody")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={"/personalizado"}>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#341f97] text-white font-semibold">
                  <ShoppingCart size={18} />
                  {t("personalized.addToCart")}
                </button>
              </Link>

              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-[#341f97] text-[#341f97] font-semibold hover:bg-[#ee5253] hover:text-white hover:border-[#ee5253]"
              >
                {t("personalized.requestQuote")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-white border-t border-[#341f97]">
        <div className="max-w-5xl mx-auto">
          <div className="border border-[#341f97] bg-[#F8EFBA] p-8 md:p-12">
            {/* Content */}
            <div className="max-w-2xl mx-auto text-center mb-10">
              <p className="text-xs uppercase tracking-[0.2em] text-[#ee5253] mb-4 font-semibold">
                {t("cta.eyebrow")}
              </p>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#341f97] mb-4 leading-tight">
                {t("cta.title")}
              </h2>

              <p className="text-[#341f97] mb-2">
                {t("cta.line1")}
              </p>

              <p className="text-sm text-[#341f97] leading-relaxed">
                {t("cta.line2")}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
              <Link
                href="/contact"
                className="px-8 py-3 bg-[#341f97] text-white font-semibold uppercase tracking-wider text-sm hover:bg-[#2c187e] transition-colors"
              >
                {t("cta.contactButton")}
              </Link>

              <div className="flex items-center gap-4 border border-[#341f97] bg-white px-4 py-3">
                <div className="w-10 h-10 flex items-center justify-center border border-[#341f97] bg-[#F8EFBA]">
                  <Phone className="w-5 h-5 text-[#341f97]" />
                </div>

                <div className="text-left">
                  <p className="text-xs uppercase tracking-[0.15em] text-[#ee5253]">
                    {t("cta.phoneLabel")}
                  </p>
                  <p className="font-semibold text-[#341f97]">
                    +52 1 55 9129 4026
                  </p>
                </div>
              </div>
            </div>

            {/* Image (integrated, no float feel) */}
            <div className="flex justify-center border-t border-[#341f97] pt-8">
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

      <Footer />
    </main>
  );
}