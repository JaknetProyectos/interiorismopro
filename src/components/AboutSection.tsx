"use client";

import Image from "next/image";
import { Clock, Palette, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { getOptimizedUrl } from "@/lib/images";

export default function AboutSection() {
  const t = useTranslations("about");

  const features = [
    {
      icon: Clock,
      title: t("features.fast.title"),
      description: t("features.fast.description"),
      color: "text-[#ff7675]",
      bgColor: "bg-[#ff7675]/15",
    },
    {
      icon: Palette,
      title: t("features.designers.title"),
      description: t("features.designers.description"),
      color: "text-[#00cec9]",
      bgColor: "bg-[#00cec9]/15",
    },
    {
      icon: Users,
      title: t("features.attention.title"),
      description: t("features.attention.description"),
      color: "text-[#ff7675]",
      bgColor: "bg-[#ff7675]/15",
    },
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-[#ffeaa7]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-14 whitespace-pre-line tracking-tight">
          {t("title")}
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Galería de imágenes redondeadas */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-5">
              <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-md hover:scale-105 transition-transform duration-300">
                <Image
                  src={getOptimizedUrl("https://images.unsplash.com/vector-1774669704906-0f961ceac5bc?q=80&w=913&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                  alt="Designer at work"
                  width={300}
                  height={400}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-md mt-10 hover:scale-105 transition-transform duration-300">
                <Image
                  src={getOptimizedUrl("https://images.unsplash.com/vector-1774859372786-aba91ccb8d6e?q=80&w=1077&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                  alt="Designer working with materials"
                  width={300}
                  height={400}
                  className="object-cover w-full h-[300px]"
                />
              </div>
            </div>

            {/* Elemento decorativo flotante verde */}
            <div className="absolute -bottom-6 -right-2 w-20 h-20 bg-[#55efc4] rounded-full flex items-center justify-center border-4 border-white shadow-md">
              <svg
                className="w-10 h-10 text-slate-900"
                viewBox="0 0 96 96"
                fill="none"
              >
                <path
                  d="M48 20 C 60 35, 70 45, 75 65 M 70 60 L 75 65 L 80 60"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Descripción y Lista de Características */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border-2 border-slate-100 shadow-sm space-y-8">
            <p className="text-slate-700 text-base font-medium leading-relaxed">
              {t("description")}
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-[#55efc4]/20 transition-all duration-300 hover:bounce cursor-pointer border border-slate-100"
                  >
                    <div
                      className={`w-14 h-14 rounded-full ${feature.bgColor} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className={`w-7 h-7 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 text-sm font-medium">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}