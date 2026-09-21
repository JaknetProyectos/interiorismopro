"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useContact } from "@/hooks/useContact";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const { sendContactForm, isLoading } = useContact();
  const t = useTranslations("ContactPage");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    asunto: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      return;
    }

    await sendContactForm({
      nombre: formData.name,
      email: formData.email,
      telefono: formData.phone,
      mensaje: formData.message,
      asunto: formData.asunto || t("defaultSubject"),
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      asunto: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-[#55efc4]">

      {/* HERO SECTION - VERDE MENTHOL (#55efc4) */}
      <section className="pt-32 pb-20 px-4 md:px-8 bg-[#55efc4] relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-sm uppercase tracking-widest text-slate-900 font-extrabold bg-white/60 px-4 py-1.5 rounded-full inline-block mb-4 border border-white">
            {t("heroEyebrow")}
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
            {t("heroTitle")}
          </h1>

          <p className="text-slate-800 font-medium max-w-2xl mx-auto mt-4 text-base md:text-lg">
            {t("heroDescription")}
          </p>
        </div>

        {/* Subtle shape */}
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-[#ffeaa7]/40 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* CONTENT SECTION - AMARILLO SOUR LEMON (#ffeaa7) */}
      <section className="py-20 px-4 md:px-8 bg-[#ffeaa7] relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

          {/* INFO SIDE */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t("infoTitle")}
            </h2>

            <div className="space-y-5">

              {/* Phone */}
              <div className="flex items-start gap-4 bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm hover:scale-[1.02] transition-transform duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#55efc4] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    {t("phoneLabel")}
                  </h3>
                  <p className="text-slate-700 text-sm font-medium mt-0.5">
                    {t("phoneValue")}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm hover:scale-[1.02] transition-transform duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#ff7675] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    {t("emailLabel")}
                  </h3>
                  <p className="text-slate-700 text-sm font-medium mt-0.5">
                    {t("emailValue")}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm hover:scale-[1.02] transition-transform duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#55efc4] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    {t("addressLabel")}
                  </h3>
                  <p className="text-slate-700 text-sm font-medium mt-0.5">
                    {t("addressValue")}
                  </p>
                </div>
              </div>

              {/* Hours */}
              {/* <div className="flex items-start gap-4 bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm hover:scale-[1.02] transition-transform duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#ff7675] flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    {t("hoursLabel")}
                  </h3>
                  <p className="text-slate-700 text-sm font-medium mt-0.5">
                    {t("hoursValue")}
                  </p>
                </div>
              </div> */}

            </div>
          </div>

          {/* FORM SIDE - NARANJA/PINK GLAMOUR (#ff7675) */}
          <div className="bg-[#ff7675] rounded-3xl border-4 border-white/30 shadow-xl p-8 md:p-10">

            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 tracking-tight text-center lg:text-left">
              {t("formTitle")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid md:grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder={t("namePlaceholder")}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full h-14 px-5 rounded-full bg-white text-slate-800 text-sm font-semibold placeholder:text-slate-400 border-2 border-transparent focus:border-[#55efc4] focus:outline-none transition-all"
                />

                <input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full h-14 px-5 rounded-full bg-white text-slate-800 text-sm font-semibold placeholder:text-slate-400 border-2 border-transparent focus:border-[#55efc4] focus:outline-none transition-all"
                />

                <input
                  type="tel"
                  placeholder={t("phonePlaceholder")}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full h-14 px-5 rounded-full bg-white text-slate-800 text-sm font-semibold placeholder:text-slate-400 border-2 border-transparent focus:border-[#55efc4] focus:outline-none transition-all"
                />

                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full py-4 px-5 rounded-3xl bg-white text-slate-800 text-sm font-semibold placeholder:text-slate-400 border-2 border-transparent focus:border-[#55efc4] focus:outline-none resize-none transition-all"
                />
              </div>

              {/* CTA - BOTÓN BLANCO CON INTERACCIÓN */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-white text-slate-900 font-extrabold text-sm uppercase tracking-wider rounded-full flex items-center justify-center hover:bg-[#ffeaa7] transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                {isLoading ? t("sendingButton") : t("sendButton")}
              </button>

            </form>
          </div>



        </div>
      </section>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.5624463103522!2d-99.1887371!3d19.431302499999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8aab7711ea9%3A0x42dcd53b6cf9b20!2sAv.%20Pdte.%20Masaryk%20178%2C%20Polanco%2C%20Polanco%20V%20Secc%2C%20Miguel%20Hidalgo%2C%2011560%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1778027298329!5m2!1ses-419!2smx"
        className="w-full"
        height="450"
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

    </main>
  );
}



