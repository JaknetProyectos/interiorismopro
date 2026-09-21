"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { getOptimizedUrl } from "@/lib/images";

export default function InspirationSection() {
  const t = useTranslations("inspirationSection");

  const inspirations = [
    {
      title: t("items.residential.title"),
      description: t("items.residential.description"),
      image:
        getOptimizedUrl("https://images.unsplash.com/photo-1643626906992-5341c0e5b6c3?q=80&w=781&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
    },
    {
      title: t("items.commercial.title"),
      description: t("items.commercial.description"),
      image:
        getOptimizedUrl("https://images.unsplash.com/photo-1711873317324-36e76613be97?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
    },
    {
      title: t("items.online.title"),
      description: t("items.online.description"),
      image:
        getOptimizedUrl("https://images.unsplash.com/photo-1558827752-1c41cb7241f4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
    },
    {
      title: t("items.furniture.title"),
      description: t("items.furniture.description"),
      image:
        getOptimizedUrl("https://images.unsplash.com/photo-1582731489225-24fc0a720737?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-[#ff7675]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#ffeaa7] mb-3">
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm md:text-base text-white/90 font-medium leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">

          {inspirations.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border-4 border-white flex flex-col hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-[260px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={450}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-500 rounded-t-2xl"
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-between flex-1">

                <div>
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#ff7675] mb-3 block">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-xl font-extrabold text-slate-900 mb-3 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}