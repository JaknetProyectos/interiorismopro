"use client";

import { useCart } from "@/context/CartContext";
import { Link } from "@/i18n/routing";
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from "lucide-react";
import { formatPrice } from "@/lib/format-price";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function CartPage() {
  const { items, total, removeItem, updateQuantity, itemCount } = useCart();
  const t = useTranslations("cartPage");

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 bg-teal-50 text-[#06d6a0] rounded-full flex items-center justify-center mb-4 shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("emptyTitle")}</h2>
        <p className="text-gray-500 max-w-md mb-6">
          {t("emptyDescription")}
        </p>
        <Link
          href="/services"
          className="px-6 py-3 bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-medium rounded-xl shadow-md transition-all duration-200 flex items-center gap-2"
        >
          {t("exploreServices")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-rose-50 text-[#ff6b6b] rounded-xl">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{t("title")}</h1>
          <p className="text-gray-500 text-sm">
            {t("itemsSelected", { count: itemCount, itemLabel: itemCount === 1 ? t("service") : t("services") })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Listado de Servicios */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="space-y-1 flex-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#06d6a0] bg-teal-50 px-2.5 py-1 rounded-full">
                  {t("badgeInteriorism")}
                </span>
                <h3 className="text-lg font-bold text-gray-800 mt-1">
                  {item.service?.title ?? t("defaultServiceTitle")}
                </h3>
                {item.selectedOption?.variant && (
                  <p className="text-sm font-medium text-gray-500">
                    {t("variantLabel")}: <span className="text-gray-700">{item.selectedOption.variant}</span>
                  </p>
                )}
                {item.meta?.nombre && (
                  <p className="text-xs text-gray-400 bg-gray-50 inline-block px-2 py-0.5 rounded">
                    {t("assignedTo")}: {item.meta.nombre} {item.meta.apellidos}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-4 sm:pt-0">
                {/* Control de Cantidad */}
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-gray-200 text-gray-600 transition-colors"
                    aria-label={t("decreaseQuantity")}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-semibold text-gray-800">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-200 text-gray-600 transition-colors"
                    aria-label={t("increaseQuantity")}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[90px]">
                  <span className="text-xs text-gray-400 block">{t("subtotal")}</span>
                  <span className="text-lg font-bold text-gray-900">MXN {formatPrice(item.subtotal)}</span>
                </div>

                {/* Botón Eliminar */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                  title={t("removeService")}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen del Pedido (Checkout box) */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm h-fit space-y-6">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
            {t("summaryTitle")}
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>{t("subtotal")}</span>
              <span className="font-semibold">MXN {formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>{t("taxesFees")}</span>
              <span className="text-gray-400">{t("calculatedAtCheckout")}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
            <span className="text-base font-bold text-gray-900">{t("estimatedTotal")}</span>
            <span className="text-2xl font-black text-[#ff6b6b]">MXN {formatPrice(total)}</span>
          </div>

          {/* Enlace directo a la página de Checkout */}
          <Link
            href="/checkout"
            className="w-full py-4 bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-bold rounded-2xl shadow-lg shadow-rose-500/20 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            {t("proceedToCheckout")}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="text-xs text-center text-gray-400 mt-2">
            {t("securityNotice")}
          </p>

          <div className="flex flex-row justify-center gap-6 p-6">
            <Image
              src="/etomin.png"
              alt="etomin"
              width={120}
              height={30}
            />
            <Image
              src="/secure-payment.png"
              alt="secure"
              width={150}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}