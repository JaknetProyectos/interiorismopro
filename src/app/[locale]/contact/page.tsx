"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useContact } from "@/hooks/useContact";
import { useTranslations } from "next-intl";

// Expresiones regulares para validación
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

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

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    const nameTrimmed = formData.name.trim();
    const emailTrimmed = formData.email.trim();
    const phoneTrimmed = formData.phone.trim();
    const messageTrimmed = formData.message.trim();

    // Validación Nombre (Obligatorio, 2-50 caracteres, solo letras y espacios)
    if (!nameTrimmed) {
      newErrors.name = t("errors.nameRequired");
    } else if (nameTrimmed.length < 2) {
      newErrors.name = t("errors.nameMinLength");
    } else if (nameTrimmed.length > 50) {
      newErrors.name = t("errors.nameMaxLength");
    } else if (!NAME_REGEX.test(nameTrimmed)) {
      newErrors.name = t("errors.nameInvalid");
    }

    // Validación Email (Obligatorio, Regex email, máx 100 caracteres)
    if (!emailTrimmed) {
      newErrors.email = t("errors.emailRequired");
    } else if (emailTrimmed.length > 100) {
      newErrors.email = t("errors.emailMaxLength");
    } else if (!EMAIL_REGEX.test(emailTrimmed)) {
      newErrors.email = t("errors.emailInvalid");
    }

    // Validación Teléfono (Obligatorio, Regex teléfono, 7-20 caracteres)
    if (!phoneTrimmed) {
      newErrors.phone = t("errors.phoneRequired");
    } else if (phoneTrimmed.length < 7) {
      newErrors.phone = t("errors.phoneMinLength");
    } else if (phoneTrimmed.length > 20) {
      newErrors.phone = t("errors.phoneMaxLength");
    } else if (!PHONE_REGEX.test(phoneTrimmed)) {
      newErrors.phone = t("errors.phoneInvalid");
    }

    // Validación Mensaje (Obligatorio, 10-1000 caracteres)
    if (!messageTrimmed) {
      newErrors.message = t("errors.messageRequired");
    } else if (messageTrimmed.length < 10) {
      newErrors.message = t("errors.messageMinLength");
    } else if (messageTrimmed.length > 1000) {
      newErrors.message = t("errors.messageMaxLength");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    await sendContactForm({
      nombre: formData.name.trim(),
      email: formData.email.trim(),
      telefono: formData.phone.trim(),
      mensaje: formData.message.trim(),
      asunto: formData.asunto.trim() || t("defaultSubject"),
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      asunto: "",
      message: "",
    });
    setErrors({});
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

            </div>
          </div>

          {/* FORM SIDE - NARANJA/PINK GLAMOUR (#ff7675) */}
          <div className="bg-[#ff7675] rounded-3xl border-4 border-white/30 shadow-xl p-8 md:p-10">

            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 tracking-tight text-center lg:text-left">
              {t("formTitle")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

              <div className="grid md:grid-cols-1 gap-4">

                {/* Nombre */}
                <div>
                  <input
                    type="text"
                    placeholder={t("namePlaceholder")}
                    maxLength={50}
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`w-full h-14 px-5 rounded-full bg-white text-slate-800 text-sm font-semibold placeholder:text-slate-400 border-2 transition-all focus:outline-none ${errors.name ? "border-amber-300 bg-red-50" : "border-transparent focus:border-[#55efc4]"
                      }`}
                  />
                  {errors.name && (
                    <p className="text-xs font-bold text-white mt-1.5 ml-4 bg-black/20 py-0.5 px-2.5 rounded-md inline-block">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    maxLength={100}
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full h-14 px-5 rounded-full bg-white text-slate-800 text-sm font-semibold placeholder:text-slate-400 border-2 transition-all focus:outline-none ${errors.email ? "border-amber-300 bg-red-50" : "border-transparent focus:border-[#55efc4]"
                      }`}
                  />
                  {errors.email && (
                    <p className="text-xs font-bold text-white mt-1.5 ml-4 bg-black/20 py-0.5 px-2.5 rounded-md inline-block">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Teléfono */}
                <div>
                  <input
                    type="tel"
                    placeholder={t("phonePlaceholder")}
                    maxLength={20}
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={`w-full h-14 px-5 rounded-full bg-white text-slate-800 text-sm font-semibold placeholder:text-slate-400 border-2 transition-all focus:outline-none ${errors.phone ? "border-amber-300 bg-red-50" : "border-transparent focus:border-[#55efc4]"
                      }`}
                  />
                  {errors.phone && (
                    <p className="text-xs font-bold text-white mt-1.5 ml-4 bg-black/20 py-0.5 px-2.5 rounded-md inline-block">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Mensaje */}
                <div>
                  <textarea
                    rows={5}
                    placeholder={t("messagePlaceholder")}
                    maxLength={1000}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className={`w-full py-4 px-5 rounded-3xl bg-white text-slate-800 text-sm font-semibold placeholder:text-slate-400 border-2 resize-none transition-all focus:outline-none ${errors.message ? "border-amber-300 bg-red-50" : "border-transparent focus:border-[#55efc4]"
                      }`}
                  />
                  {errors.message && (
                    <p className="text-xs font-bold text-white mt-1.5 ml-4 bg-black/20 py-0.5 px-2.5 rounded-md inline-block">
                      {errors.message}
                    </p>
                  )}
                </div>

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



