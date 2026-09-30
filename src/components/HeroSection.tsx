"use client";

import { useState } from "react";
import Image from "next/image";
import { useContact } from "@/hooks/useContact";
import { useTranslations } from "next-intl";
import { Send, Compass, MapPin, User, Mail, HelpCircle, MessageSquare } from "lucide-react";
import { getOptimizedUrl } from "@/lib/images";

// Regext para validación
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/;

interface FormErrors {
  name?: string;
  email?: string;
  affair?: string;
  message?: string;
}

export default function HeroSection() {
  const { sendContactForm, isLoading } = useContact();
  const t = useTranslations("Hero");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    affair: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    const nameTrimmed = formData.name.trim();
    const emailTrimmed = formData.email.trim();
    const affairTrimmed = formData.affair.trim();
    const messageTrimmed = formData.message.trim();

    // Validación Nombre (Obligatorio, 2-50 chars, solo letras y espacios)
    if (!nameTrimmed) {
      newErrors.name = t("form.errors.nameRequired");
    } else if (nameTrimmed.length < 2) {
      newErrors.name = t("form.errors.nameMinLength");
    } else if (nameTrimmed.length > 50) {
      newErrors.name = t("form.errors.nameMaxLength");
    } else if (!NAME_REGEX.test(nameTrimmed)) {
      newErrors.name = t("form.errors.nameInvalid");
    }

    // Validación Email (Obligatorio, Regex, máx 100 chars)
    if (!emailTrimmed) {
      newErrors.email = t("form.errors.emailRequired");
    } else if (emailTrimmed.length > 100) {
      newErrors.email = t("form.errors.emailMaxLength");
    } else if (!EMAIL_REGEX.test(emailTrimmed)) {
      newErrors.email = t("form.errors.emailInvalid");
    }

    // Validación Asunto (Opcional, máx 100 chars)
    if (affairTrimmed.length > 100) {
      newErrors.affair = t("form.errors.affairMaxLength");
    }

    // Validación Mensaje (Obligatorio, 10-1000 chars)
    if (!messageTrimmed) {
      newErrors.message = t("form.errors.messageRequired");
    } else if (messageTrimmed.length < 10) {
      newErrors.message = t("form.errors.messageMinLength");
    } else if (messageTrimmed.length > 1000) {
      newErrors.message = t("form.errors.messageMaxLength");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpiar el error del campo que está cambiando
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    await sendContactForm({
      nombre: formData.name.trim(),
      email: formData.email.trim(),
      asunto: formData.affair.trim() || t("defaultSubject"),
      mensaje: formData.message.trim(),
    });

    setFormData({
      name: "",
      email: "",
      affair: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <section className="min-h-screen bg-[#55efc4] pt-32 pb-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* IZQUIERDA: Título y Galería estilo Collage */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
                {t("title.line1")}<br />{t("title.line2")}
              </h1>
            </div>

            <div className="relative pt-4 pb-6">
              <div className="grid grid-cols-2 gap-4 max-w-xl">
                <div className="relative h-72 rounded-3xl overflow-hidden shadow-lg -rotate-2 hover:rotate-0 transition-transform duration-300 border-4 border-white">
                  <Image
                    src={getOptimizedUrl("https://images.unsplash.com/vector-1778433580286-fefc27e11b7c?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                    alt="Professional worker"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-3 left-3 bg-[#ffeaa7] p-2 rounded-full border border-slate-200">
                    <Compass size={20} className="text-slate-800" />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="relative h-44 rounded-3xl overflow-hidden shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300 border-4 border-white">
                    <Image
                      src={getOptimizedUrl("https://images.unsplash.com/vector-1780991635460-360eab36fb02?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                      alt="Tourism spot"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-[#00cec9] p-2 rounded-full border border-white">
                      <MapPin size={18} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DERECHA: Formulario */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-[#ff7675] rounded-3xl p-8 shadow-xl border-4 border-white/30">

              <h2 className="text-2xl font-black text-white mb-6 text-center tracking-tight">
                {t("form.title")}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                {/* Input Nombre */}
                <div>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder={t("form.placeholders.name")}
                      maxLength={50}
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={`w-full h-14 pl-12 pr-4 rounded-full bg-white text-slate-800 text-sm font-semibold placeholder:text-slate-400 border-2 transition-all focus:outline-none ${
                        errors.name ? "border-amber-300 bg-red-50" : "border-transparent focus:border-[#00cec9]"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs font-bold text-white mt-1.5 ml-4 bg-black/20 py-0.5 px-2 rounded-md inline-block">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Input Email */}
                <div>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder={t("form.placeholders.email")}
                      maxLength={100}
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={`w-full h-14 pl-12 pr-4 rounded-full bg-white text-slate-800 text-sm font-semibold placeholder:text-slate-400 border-2 transition-all focus:outline-none ${
                        errors.email ? "border-amber-300 bg-red-50" : "border-transparent focus:border-[#00cec9]"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs font-bold text-white mt-1.5 ml-4 bg-black/20 py-0.5 px-2 rounded-md inline-block">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Input Asunto */}
                <div>
                  <div className="relative">
                    <HelpCircle size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder={t("form.placeholders.subject")}
                      maxLength={100}
                      value={formData.affair}
                      onChange={(e) => handleChange("affair", e.target.value)}
                      className={`w-full h-14 pl-12 pr-4 rounded-full bg-white text-slate-800 text-sm font-semibold placeholder:text-slate-400 border-2 transition-all focus:outline-none ${
                        errors.affair ? "border-amber-300 bg-red-50" : "border-transparent focus:border-[#00cec9]"
                      }`}
                    />
                  </div>
                  {errors.affair && (
                    <p className="text-xs font-bold text-white mt-1.5 ml-4 bg-black/20 py-0.5 px-2 rounded-md inline-block">
                      {errors.affair}
                    </p>
                  )}
                </div>

                {/* Textarea Mensaje */}
                <div>
                  <div className="relative">
                    <MessageSquare size={18} className="absolute left-4 top-4 text-slate-400" />
                    <textarea
                      placeholder={t("form.placeholders.message")}
                      rows={4}
                      maxLength={1000}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-3xl bg-white text-slate-800 text-sm font-semibold placeholder:text-slate-400 border-2 resize-none transition-all focus:outline-none ${
                        errors.message ? "border-amber-300 bg-red-50" : "border-transparent focus:border-[#00cec9]"
                      }`}
                    />
                  </div>
                  {errors.message && (
                    <p className="text-xs font-bold text-white mt-1.5 ml-4 bg-black/20 py-0.5 px-2 rounded-md inline-block">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Botón */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-white text-slate-900 font-extrabold text-sm uppercase tracking-wider rounded-full flex items-center justify-center gap-2 hover:bg-[#ffeaa7] transition-all duration-300 hover:animate-bounce active:scale-95 disabled:opacity-50"
                >
                  <Send size={18} className="text-[#ff7675]" />
                  <span>{isLoading ? t("form.sending") : t("form.submit")}</span>
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}