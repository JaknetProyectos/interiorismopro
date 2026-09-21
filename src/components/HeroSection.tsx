"use client";

import { useState } from "react";
import Image from "next/image";
import { useContact } from "@/hooks/useContact";
import { useTranslations } from "next-intl";
import { Send, Compass, MapPin, Sparkles, User, Mail, HelpCircle, MessageSquare } from "lucide-react";
import { getOptimizedUrl } from "@/lib/images";

export default function HeroSection() {
  const { sendContactForm, isLoading } = useContact();
  const t = useTranslations("Hero");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    affair: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) return;

    await sendContactForm({
      nombre: formData.name,
      email: formData.email,
      asunto: formData.affair || t("defaultSubject"),
      mensaje: formData.message,
    });

    setFormData({
      name: "",
      email: "",
      affair: "",
      message: "",
    });
  };

  return (
    <section className="min-h-screen bg-[#55efc4] pt-32 pb-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* IZQUIERDA: Título y Galería estilo Collage */}
          <div className="lg:col-span-7 flex flex-col gap-10">

            {/* Título Principal */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
                {t("title.line1")}<br />{t("title.line2")}
              </h1>
            </div>

            {/* Galería de Imágenes Interactiva (Collage Flat UI) */}
            <div className="relative pt-4 pb-6">
              <div className="grid grid-cols-2 gap-4 max-w-xl">
                
                {/* Imagen Principal Grande */}
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

                {/* Collage Imagen Secundaria + Badge */}
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

          {/* DERECHA: Formulario Naranja/Coral Flat UI */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-[#ff7675] rounded-3xl p-8 shadow-xl border-4 border-white/30">

              <h2 className="text-2xl font-black text-white mb-6 text-center tracking-tight">
                {t("form.title")}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Input Nombre */}
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder={t("form.placeholders.name")}
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full h-14 pl-12 pr-4 rounded-full bg-white text-slate-800 text-sm font-semibold placeholder:text-slate-400 border-2 border-transparent focus:border-[#00cec9] focus:outline-none transition-all"
                  />
                </div>

                {/* Input Email */}
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    placeholder={t("form.placeholders.email")}
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full h-14 pl-12 pr-4 rounded-full bg-white text-slate-800 text-sm font-semibold placeholder:text-slate-400 border-2 border-transparent focus:border-[#00cec9] focus:outline-none transition-all"
                  />
                </div>

                {/* Input Asunto */}
                <div className="relative">
                  <HelpCircle size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder={t("form.placeholders.subject")}
                    value={formData.affair}
                    onChange={(e) =>
                      setFormData({ ...formData, affair: e.target.value })
                    }
                    className="w-full h-14 pl-12 pr-4 rounded-full bg-white text-slate-800 text-sm font-semibold placeholder:text-slate-400 border-2 border-transparent focus:border-[#00cec9] focus:outline-none transition-all"
                  />
                </div>

                {/* Textarea Mensaje */}
                <div className="relative">
                  <MessageSquare size={18} className="absolute left-4 top-4 text-slate-400" />
                  <textarea
                    placeholder={t("form.placeholders.message")}
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3.5 rounded-3xl bg-white text-slate-800 text-sm font-semibold placeholder:text-slate-400 border-2 border-transparent focus:border-[#00cec9] focus:outline-none resize-none transition-all"
                  />
                </div>

                {/* Botón Blanco con Efecto Bounce */}
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