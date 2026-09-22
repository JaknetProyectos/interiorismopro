"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Sparkles,
  ShieldCheck,
  Building2,
  PhoneCall,
  Mail,
  MapPin,
  ChevronRight,
} from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");

  const services = t.raw("services") as string[];
  const legal = t.raw("legal") as { name: string; href: string }[];

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Services - Color Verde Menthol (#55efc4) */}
          <div className="bg-slate-900/90 p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-2xl bg-[#55efc4]/15 text-[#55efc4]">
                  <Sparkles size={22} />
                </div>
                <h3 className="font-extrabold text-lg text-white tracking-tight">
                  {t("titles.services")}
                </h3>
              </div>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      href="/services"
                      className="text-slate-300 text-sm font-medium hover:text-[#55efc4] transition-colors duration-200 flex items-center gap-2"
                    >
                      <ChevronRight size={14} className="text-[#55efc4]" />
                      <span>{service}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legal - Color Amarillo Sour Lemon (#ffeaa7) */}
          <div className="bg-slate-900/90 p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-2xl bg-[#ffeaa7]/15 text-[#ffeaa7]">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="font-extrabold text-lg text-white tracking-tight">
                  {t("titles.legal")}
                </h3>
              </div>
              <ul className="space-y-3">
                {legal.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-slate-300 text-sm font-medium hover:text-[#ffeaa7] transition-colors duration-200 flex items-center gap-2"
                    >
                      <ChevronRight size={14} className="text-[#ffeaa7]" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact - Color Naranja Coral (#ff7675) */}
          <div className="lg:col-span-2 bg-slate-900/90 p-8 rounded-3xl border border-slate-800 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-[#ff7675]/15 text-[#ff7675]">
                <Building2 size={22} />
              </div>
              <h3 className="font-extrabold text-lg text-white tracking-tight">
                {t("titles.contact")}
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Teléfono */}
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <div className="flex items-center gap-2 mb-2 text-[#ff7675]">
                  <PhoneCall size={16} />
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t("contact.phone")}
                  </p>
                </div>
                <p className="text-sm font-semibold text-white">
                  +52 1 55 9129 4026
                </p>
              </div>

              {/* Email */}
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <div className="flex items-center gap-2 mb-2 text-[#ff7675]">
                  <Mail size={16} />
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t("contact.email")}
                  </p>
                </div>
                <p className="text-sm font-semibold text-white break-all">
                  cuentanos@interiorismopro.com
                </p>
              </div>

              {/* Dirección */}
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <div className="flex items-center gap-2 mb-2 text-[#ff7675]">
                  <MapPin size={16} />
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t("contact.address")}
                  </p>
                </div>
                <p className="text-sm font-medium text-slate-300 leading-relaxed">
                  {t("contact.fullAddress")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Logo y Tagline */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center bg-slate-900 px-4 py-2 rounded-2xl border border-slate-800">
                <Image
                  src="/title.png"
                  alt={"etomin"}
                  width={120}
                  height={30}
                />
              </div>

              <p className="text-xs font-medium text-slate-400 text-center sm:text-left">
                {t("bottom.tagline")}
              </p>
            </div>

            {/* Derechos Reservados */}
            <p className="text-xs font-medium text-slate-400 text-center">
              {t("bottom.rights")}
            </p>
          </div>

          {/* Tarjetas de Pago */}
          <div className="flex justify-center gap-4 mt-8">
            <div className="bg-slate-900 px-5 py-2.5 rounded-full flex items-center gap-3 border border-slate-800 shadow-inner">

              <Image
                src="/cards.png"
                alt={"etomin"}
                width={120}
                height={30}
              />

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}