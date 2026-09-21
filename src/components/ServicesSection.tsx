"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Phone } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { getOptimizedUrl } from "@/lib/images";

export default function ServicesSection() {
  const [activeService, setActiveService] = useState("residential");
  const t = useTranslations("servicesSection");

  const services = [
    {
      id: "residential",
      title: t("items.residential.title"),
      description: t("items.residential.description"),
      features: [
        t("items.residential.features.f1"),
        t("items.residential.features.f2"),
        t("items.residential.features.f3"),
        t("items.residential.features.f4"),
      ],
      image:
        getOptimizedUrl("https://images.unsplash.com/photo-1742541656775-5fc717774c02?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
    {
      id: "commercial",
      title: t("items.commercial.title"),
      description: t("items.commercial.description"),
      features: [
        t("items.commercial.features.f1"),
        t("items.commercial.features.f2"),
        t("items.commercial.features.f3"),
        t("items.commercial.features.f4"),
      ],
      image:
        getOptimizedUrl("https://images.unsplash.com/photo-1637730827702-de34e9ae4ede?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
    {
      id: "online",
      title: t("items.online.title"),
      description: t("items.online.description"),
      features: [
        t("items.online.features.f1"),
        t("items.online.features.f2"),
        t("items.online.features.f3"),
        t("items.online.features.f4"),
      ],
      image:
        getOptimizedUrl("https://images.unsplash.com/photo-1599420187237-108ef829201c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
    {
      id: "furniture",
      title: t("items.furniture.title"),
      description: t("items.furniture.description"),
      features: [
        t("items.furniture.features.f1"),
        t("items.furniture.features.f2"),
        t("items.furniture.features.f3"),
        t("items.furniture.features.f4"),
      ],
      image:
        getOptimizedUrl("https://images.unsplash.com/photo-1681399583998-4d52059750f5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
    {
      id: "lighting",
      title: t("items.lighting.title"),
      description: t("items.lighting.description"),
      features: [
        t("items.lighting.features.f1"),
        t("items.lighting.features.f2"),
        t("items.lighting.features.f3"),
        t("items.lighting.features.f4"),
      ],
      image:
        getOptimizedUrl("https://images.unsplash.com/photo-1528207734449-c5482f81a727?q=80&w=723&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
  ];

  const currentService =
    services.find((s) => s.id === activeService) || services[0];

  return (
    <section className="py-24 px-4 md:px-8 bg-[#ff7675]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#55efc4] mb-3">
              {t("eyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight">
              {t("title")}
            </h2>
            <p className="text-sm md:text-base text-white/90 max-w-2xl leading-relaxed font-medium">
              {t("subtitle")}
            </p>
          </div>

          <Link href={"/services"}>
            <button className="px-8 py-4 rounded-full bg-[#55efc4] text-slate-900 font-extrabold uppercase tracking-wider text-sm hover:bg-white transition-all duration-300 self-start lg:self-auto shadow-md">
              {t("viewAll")}
            </button>
          </Link>
        </div>

        {/* Service Tabs */}
        <div className="bg-white/10 p-2 rounded-3xl backdrop-blur-md">
          <div className="flex overflow-x-auto gap-2 scrollbar-none">
            {services.map((service, index) => {
              const active = activeService === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`shrink-0 px-6 py-4 rounded-2xl text-left transition-all duration-300 min-w-[200px] md:min-w-[220px] ${
                    active
                      ? "bg-white text-slate-900 shadow-md scale-105"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <span
                    className={`block text-xs font-black uppercase tracking-[0.18em] mb-1 ${
                      active ? "text-[#ff7675]" : "text-[#55efc4]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="block text-sm font-extrabold leading-snug">
                    {service.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Service Content */}
        <div className="mt-8 rounded-3xl bg-white overflow-hidden shadow-xl border-4 border-white">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-4 md:p-6 bg-slate-50 flex items-center justify-center">
              <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={currentService.image}
                  alt={currentService.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#55efc4]/20 text-[#00cec9] text-xs font-extrabold uppercase tracking-[0.18em]">
                    {t("selectedService")}
                  </span>
                  <span className="h-0.5 flex-1 bg-slate-100 rounded-full" />
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                  {currentService.title}
                </h3>

                <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-8 max-w-2xl font-medium">
                  {currentService.description}
                </p>

                <ul className="space-y-4">
                  {currentService.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex w-6 h-6 items-center justify-center rounded-full bg-[#55efc4] text-slate-900 shrink-0 shadow-sm">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                      <span className="text-sm md:text-base text-slate-700 font-semibold leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#ff7675]/15 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#ff7675]" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400 mb-0.5">
                    {t("contactLabel")}
                  </p>
                  <p className="font-extrabold text-slate-900 text-sm md:text-base">
                    +52 1 55 9129 4026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}