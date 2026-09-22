"use client";

import { useState, useEffect } from "react";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import {
  Menu,
  X,
  Phone,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Home,
  Briefcase,
  Mail,
  Globe,
  ShoppingCart
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTranslations, useLocale } from "next-intl";
import { formatPrice } from "@/lib/format-price";
import Image from "next/image";
import { useLocaleContext } from "@/context/LangContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, total, itemCount, removeItem, updateQuantity } = useCart();

  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Header");
  const locale = useLocale();

  const { switchLanguage } = useLocaleContext();

  // Bloquea el scroll del body cuando el drawer o menú está abierto
  useEffect(() => {
    if (isCartOpen || isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen, isMenuOpen]);

  return (
    <>
      {/* HEADER PRINCIPAL - Fondo blanco plano y más alto */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b-2 border-slate-100 transition-all">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24">
          
          {/* Logo limpio sin contenedores ni bordes */}
          <Link
            href="/"
            locale={locale}
            className="flex items-center gap-4 transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <Image
              src="/logo.png"
              alt={t("logoAlt")}
              width={60}
              height={36}
              className="object-contain"
            />
            <Image
              src="/title.png"
              alt={t("titleAlt")}
              width={210}
              height={28}
              className="object-contain hidden sm:block"
            />
          </Link>

          {/* Navegación Desktop - Textos e íconos más grandes */}
          <nav className="hidden md:flex items-center gap-3 bg-slate-50 p-2 rounded-full border border-slate-200">
            <Link
              href="/"
              locale={locale}
              className="flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-semibold text-slate-700 hover:bg-[#ffeaa7] hover:text-slate-900 transition-all duration-300 hover:animate-bounce active:scale-95"
            >
              <Home size={18} className="text-[#ff7675]" />
              <span>{t("home")}</span>
            </Link>

            <Link
              href="/services"
              locale={locale}
              className="flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-semibold text-slate-700 hover:bg-[#ffeaa7] hover:text-slate-900 transition-all duration-300 hover:animate-bounce active:scale-95"
            >
              <Briefcase size={18} className="text-[#00cec9]" />
              <span>{t("services")}</span>
            </Link>

            <Link
              href="/contact"
              locale={locale}
              className="flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-semibold text-slate-700 hover:bg-[#ffeaa7] hover:text-slate-900 transition-all duration-300 hover:animate-bounce active:scale-95"
            >
              <Mail size={18} className="text-[#ff7675]" />
              <span>{t("contact")}</span>
            </Link>
          </nav>

          {/* Acciones Lado Derecho */}
          <div className="flex items-center gap-3">
            
            {/* Selector Idioma */}
            <div className="flex items-center p-1 bg-slate-100 rounded-full border border-slate-200">
              <Globe size={16} className="ml-2 mr-1 text-slate-400 hidden sm:block" />
              <button
                onClick={() => switchLanguage("es")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 active:scale-90 ${
                  locale === "es"
                    ? "bg-[#00cec9] text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ES
              </button>
              <button
                onClick={() => switchLanguage("en")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 active:scale-90 ${
                  locale === "en"
                    ? "bg-[#00cec9] text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                EN
              </button>
            </div>

            {/* Botón Carrito */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-3 px-5 py-3 rounded-full bg-[#ff7675] text-white font-bold hover:bg-[#e66767] transition-all duration-300 active:scale-90"
            >
              <ShoppingBag size={20} className="text-white" />
              
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ffeaa7] text-slate-900 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Menú Móvil */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-3 rounded-full bg-slate-100 text-slate-800 hover:bg-[#ffeaa7] transition-all duration-200 active:scale-90"
            >
              <Menu size={24} className="text-slate-800" />
            </button>
          </div>
        </div>
      </header>

      {/* CART DRAWER BACKDROP */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-50 transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* CART DRAWER CONTAINER */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-slate-50 z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#00cec9]/15 rounded-2xl">
              <ShoppingCart size={24} className="text-[#00cec9]" />
            </div>
            <h3 className="font-bold text-slate-900 text-xl">{t("cart")}</h3>
            <span className="text-xs bg-[#ffeaa7] text-slate-900 font-bold px-3 py-1 rounded-full border border-slate-300">
              {itemCount}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 active:scale-90"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#ffeaa7] flex items-center justify-center text-slate-800">
                <ShoppingBag size={36} className="text-slate-700" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-800 text-lg">{t("emptyCart")}</p>
                <p className="text-xs font-medium text-slate-500">{t("emptyCartSubtext")}</p>
              </div>
            </div>
          ) : (
            items.map((item, index) => {
              const itemTitle = item.service?.title || t("defaultServiceTitle");
              const itemImage = "/logo.png";

              return (
                <div
                  key={`${item.id}-${index}`}
                  className="p-4 bg-white rounded-3xl border border-slate-200 flex gap-4 items-start"
                >
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shrink-0">
                    <Image
                      src={itemImage}
                      alt={itemTitle}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between h-20">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-semibold text-slate-900 truncate">
                          {itemTitle}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-[#ff7675] transition-colors p-1 rounded-full hover:bg-slate-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      {item.selectedOption?.variant && (
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {item.selectedOption.variant}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm font-bold text-[#ff7675]">
                        ${formatPrice(item.price * item.quantity)} MXN
                      </span>

                      <div className="flex items-center border border-slate-200 rounded-full bg-slate-50 p-0.5">
                        <button
                          onClick={() => updateQuantity?.(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 text-slate-600 hover:bg-white rounded-full transition-colors active:scale-90"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-semibold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity?.(item.id, item.quantity + 1)}
                          className="p-1 text-slate-600 hover:bg-white rounded-full transition-colors active:scale-90"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-slate-200 bg-white space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-500">
                <span>{t("shippingTaxes")}</span>
                <span>{t("calculatedAtCheckout")}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-slate-900">
                <span>{t("total")}</span>
                <span className="text-[#00cec9]">${formatPrice(total)} MXN</span>
              </div>
            </div>

            <Link
              href="/cart"
              locale={locale}
              onClick={() => setIsCartOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-4 px-5 bg-[#ffeaa7] hover:bg-[#f3de96] text-slate-900 font-bold rounded-full transition-all duration-200 active:scale-95 text-xs uppercase tracking-wider"
            >
              <span>{t("viewCart")}</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/checkout"
              locale={locale}
              onClick={() => setIsCartOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-4 px-5 bg-[#ff7675] hover:bg-[#e66767] text-white font-bold rounded-full transition-all duration-200 active:scale-95 text-xs uppercase tracking-wider"
            >
              <span>{t("checkout")}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </aside>

      {/* MENÚ MÓVIL FULLSCREEN */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col md:hidden">
          <div className="flex items-center justify-between p-6 bg-white border-b border-slate-200">
            <span className="font-bold text-2xl text-slate-900">{t("mobileMenuTitle")}</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2.5 rounded-full bg-slate-100 text-slate-800 hover:bg-[#ffeaa7] transition-all duration-200 active:scale-90"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex flex-col justify-between flex-1 p-6">
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                locale={locale}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-4 p-4 bg-white rounded-3xl font-semibold text-slate-800 text-lg border border-slate-200 hover:border-[#ffeaa7] transition-all duration-200 active:scale-95"
              >
                <div className="p-2.5 bg-[#ff7675]/15 rounded-2xl">
                  <Home size={22} className="text-[#ff7675]" />
                </div>
                <span>{t("home")}</span>
              </Link>

              <Link
                href="/services"
                locale={locale}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-4 p-4 bg-white rounded-3xl font-semibold text-slate-800 text-lg border border-slate-200 hover:border-[#ffeaa7] transition-all duration-200 active:scale-95"
              >
                <div className="p-2.5 bg-[#00cec9]/15 rounded-2xl">
                  <Briefcase size={22} className="text-[#00cec9]" />
                </div>
                <span>{t("services")}</span>
              </Link>

              <Link
                href="/contact"
                locale={locale}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-4 p-4 bg-white rounded-3xl font-semibold text-slate-800 text-lg border border-slate-200 hover:border-[#ffeaa7] transition-all duration-200 active:scale-95"
              >
                <div className="p-2.5 bg-[#ff7675]/15 rounded-2xl">
                  <Mail size={22} className="text-[#ff7675]" />
                </div>
                <span>{t("contact")}</span>
              </Link>
            </nav>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("contactLabel")}</p>
              <a
                href="tel:+525591294026"
                className="flex items-center gap-3 text-slate-900 font-bold text-base"
              >
                <div className="p-2.5 bg-[#ffeaa7] rounded-full">
                  <Phone size={18} className="text-slate-800" />
                </div>
                <span>+52 1 55 9129 4026</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}