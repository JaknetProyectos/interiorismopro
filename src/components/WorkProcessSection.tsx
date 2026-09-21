"use client";

import { Calendar, MessageSquare, FileCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function WorkProcessSection() {
  const t = useTranslations("workProcess");

  const steps = [
    {
      icon: Calendar,
      title: t("steps.step1.title"),
      description: t("steps.step1.description"),
    },
    {
      icon: MessageSquare,
      title: t("steps.step2.title"),
      description: t("steps.step2.description"),
    },
    {
      icon: FileCheck,
      title: t("steps.step3.title"),
      description: t("steps.step3.description"),
    },
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-[#55efc4]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm md:text-base text-slate-800 font-medium max-w-md leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Horizontal Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="flex flex-col justify-between p-8 bg-white rounded-3xl border-4 border-white shadow-md hover:scale-105 transition-all duration-300 relative group"
              >
                {/* Step number badge con acento amarillo */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-[#ffeaa7] text-slate-900 rounded-full border border-slate-200">
                    {t("stepLabel", { number: index + 1 })}
                  </span>
                  
                  {/* Icono con contenedor amarillo redondeado */}
                  <div className="w-12 h-12 rounded-2xl bg-[#ffeaa7] flex items-center justify-center border-2 border-slate-100 group-hover:rotate-6 transition-transform">
                    <Icon className="w-6 h-6 text-slate-900" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}