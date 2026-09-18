"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { PayRequestBody, PayApiResponse } from "@/types/checkout";
import {
  CreditCard,
  User,
  MapPin,
  Tag,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { EmailItem } from "@/types/cart-item";
import { ConfirmRequestBody } from "../api/confirm/route";
import { formatPrice } from "@/lib/format-price";

// 1. Array de cupones reutilizable
interface Coupon {
  code: string;
  type: "percent" | "fixed";
  value: number;
}

const AVAILABLE_COUPONS: Coupon[] = [
  { code: "PRO10", type: "percent", value: 10 },  // 10% de descuento
  { code: "INTERIOR500", type: "fixed", value: 500 }, // $500 MXN de descuento
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total: subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  // Estado de Cupones
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Formulario con todos los campos (Obligatorios y Opcionales)
  const [formData, setFormData] = useState({
    // Cliente
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    empresa: "", // Opcional
    // Dirección
    direccion: "",
    direccion2: "", // Opcional
    ciudad: "",
    estado: "",
    cp: "",
    pais: "MX", // Opcional (default MX)
    // Tarjeta
    cardNumber: "",
    cardName: "",
    cardMonth: "",
    cardYear: "",
    cardCvv: "",
    // Metadata
    notes: "", // Opcional
  });

  // Cálculo de Descuentos y Total Final
  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === "percent") {
      return (subtotal * appliedCoupon.value) / 100;
    }
    return Math.min(appliedCoupon.value, subtotal);
  }, [subtotal, appliedCoupon]);

  const finalTotal = useMemo(() => {
    return Math.max(0, subtotal - discountAmount);
  }, [subtotal, discountAmount]);

  // Manejo de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validar y aplicar cupón
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponInput.trim().toUpperCase();

    if (!cleanCode) {
      toast.error("Por favor ingresa un código de cupón");
      return;
    }

    const found = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);

    if (found) {
      setAppliedCoupon(found);
      toast.success(`Cupón "${found.code}" aplicado correctamente`);
    } else {
      toast.error("El cupón ingresado no es válido o ha expirado");
    }
  };

  // Procesar pago contra /api/pay
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Tu carrito está vacío");
      return;
    }

    setLoading(true);

    // 1. Pay Payload
    const payPayload: PayRequestBody = {
      amount: finalTotal,
      currency: "MXN",
      cardData: {
        number: formData.cardNumber,
        name: formData.cardName,
        month: formData.cardMonth,
        year: formData.cardYear,
        cvv: formData.cardCvv,
      },
      customer: {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: formData.telefono,
        direccion: formData.direccion,
        direccion2: formData.direccion2 || undefined,
        ciudad: formData.ciudad,
        estado: formData.estado,
        cp: formData.cp,
        pais: formData.pais || "MX",
        empresa: formData.empresa || undefined,
      },
      metadata: {
        notes: formData.notes || undefined,
      },
    };

    try {
      // PASO 1: Cobro en la pasarela
      const payRes = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payPayload),
      });

      const payResult = await payRes.json();

      if (!payRes.ok || !payResult.success) {
        throw new Error(payResult.error || "El pago fue declinado.");
      }

      // PASO 2: Confirmación y envío de emails tras cobro exitoso
      const emailItems: EmailItem[] = items.map((item) => ({
        id: item.id,
        title: item.service?.title || "Servicio",
        price: item.price,
        quantity: item.quantity,
        description: item.selectedOption?.variant || undefined,
      }));

      const confirmPayload: ConfirmRequestBody = {
        orderId: payResult.orderId,
        amount: finalTotal,
        items: emailItems,
        customer: {
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          telefono: formData.telefono,
          direccion: formData.direccion,
          ciudad: formData.ciudad,
          estado: formData.estado,
          cp: formData.cp,
        },
        notes: formData.notes || undefined,
      };

      await fetch("/api/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(confirmPayload),
      });

      // PASO 3: Feedback y limpieza
      toast.success(`Pago exitoso. Orden #${payResult.orderId}`);
      clearCart();

    } catch (error: any) {
      toast.error(error.message || "Error procesando el pedido");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No hay productos para pagar</h2>
        <p className="text-gray-500 mb-6">Regresa al carrito y añade servicios antes de proceder al checkout.</p>
        <Link
          href="/cart"
          className="px-6 py-3 bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-medium rounded-xl shadow-md transition-colors"
        >
          Volver al Carrito
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
        <Link href="/cart" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver al carrito
        </Link>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#06d6a0] bg-teal-50 px-3 py-1 rounded-full">
          Pago Seguro 256-bit
        </span>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Formulario Principal (Campos) */}
        <div className="lg:col-span-2 space-y-6">

          {/* 1. Datos Personales */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-lg border-b border-gray-50 pb-3">
              <User className="w-5 h-5 text-[#ff6b6b]" />
              Datos de Contacto
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Nombre *</label>
                <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff6b6b]" placeholder="John" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Apellido *</label>
                <input required type="text" name="apellido" value={formData.apellido} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff6b6b]" placeholder="Doe" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Correo Electrónico *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff6b6b]" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Teléfono *</label>
                <input required type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff6b6b]" placeholder="5512345678" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Empresa <span className="text-gray-400 font-normal">(Opcional)</span></label>
                <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff6b6b]" placeholder="Nombre de tu estudio o negocio" />
              </div>
            </div>
          </div>

          {/* 2. Dirección de Facturación / Envío */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-lg border-b border-gray-50 pb-3">
              <MapPin className="w-5 h-5 text-[#ff6b6b]" />
              Dirección
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Calle y Número *</label>
                <input required type="text" name="direccion" value={formData.direccion} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff6b6b]" placeholder="Av. Insurgentes Sur 123" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Colonia, Interior o Depto <span className="text-gray-400 font-normal">(Opcional)</span></label>
                <input type="text" name="direccion2" value={formData.direccion2} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff6b6b]" placeholder="Depto 4B" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Ciudad *</label>
                <input required type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff6b6b]" placeholder="Ciudad de México" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Estado *</label>
                <input required type="text" name="estado" value={formData.estado} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff6b6b]" placeholder="CDMX" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Código Postal *</label>
                <input required type="text" name="cp" value={formData.cp} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff6b6b]" placeholder="01000" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">País <span className="text-gray-400 font-normal">(Opcional)</span></label>
                <select name="pais" value={formData.pais} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm bg-white focus:outline-none focus:border-[#ff6b6b]">
                  <option value="MX">México (MX)</option>
                  <option value="US">Estados Unidos (US)</option>
                  <option value="ES">España (ES)</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3. Información de Pago */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-lg border-b border-gray-50 pb-3">
              <CreditCard className="w-5 h-5 text-[#ff6b6b]" />
              Información de la Tarjeta
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Nombre en la tarjeta *</label>
                <input required type="text" name="cardName" value={formData.cardName} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff6b6b]" placeholder="Como aparece en el plástico" />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Número de tarjeta *</label>
                <input required type="text" name="cardNumber" maxLength={16} value={formData.cardNumber} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff6b6b]" placeholder="0000 0000 0000 0000" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Mes Exp. (MM) *</label>
                <input required type="text" name="cardMonth" maxLength={2} value={formData.cardMonth} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff6b6b]" placeholder="08" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Año Exp. (YY) *</label>
                <input required type="text" name="cardYear" maxLength={4} value={formData.cardYear} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff6b6b]" placeholder="28" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">CVV *</label>
                <input required type="password" name="cardCvv" maxLength={4} value={formData.cardCvv} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff6b6b]" placeholder="123" />
              </div>
            </div>
          </div>

          {/* 4. Notas Adicionales */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <label className="block text-xs font-semibold text-gray-500 mb-2">Notas o instrucciones del proyecto <span className="text-gray-400 font-normal">(Opcional)</span></label>
            <textarea name="notes" rows={2} value={formData.notes} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff6b6b]" placeholder="Comentarios especiales para tu arquitecto o diseñador..." />
          </div>
        </div>

        {/* Resumen Lateral + Cupones + Pagar */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
              Resumen del Pedido
            </h2>

            {/* Lista corta de items */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div>
                    <p className="font-semibold text-gray-800">{item.service?.title}</p>
                    <p className="text-xs text-gray-400">Cant: {item.quantity} {item.selectedOption?.variant && `• ${item.selectedOption.variant}`}</p>
                  </div>
                  <span className="font-semibold text-gray-700">{formatPrice(item.subtotal)} MXN</span>
                </div>
              ))}
            </div>

            {/* Input de Cupón */}
            <div className="border-t border-gray-100 pt-4">
              <label className="block text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#06d6a0]" /> ¿Tienes un cupón?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Ej: PRO10"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm uppercase focus:outline-none focus:border-[#06d6a0]"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Aplicar
                </button>
              </div>

              {appliedCoupon && (
                <div className="mt-2 flex items-center justify-between text-xs bg-teal-50 text-[#06d6a0] p-2 rounded-lg font-medium">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Cupón {appliedCoupon.code} aplicado
                  </span>
                  <button type="button" onClick={() => setAppliedCoupon(null)} className="text-gray-400 hover:text-gray-600 underline">Quitar</button>
                </div>
              )}
            </div>

            {/* Totales */}
            <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)} MXN</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#06d6a0] font-medium">
                  <span>Descuento</span>
                  <span>- {formatPrice(discountAmount)} MXN</span>
                </div>
              )}
              <div className="flex justify-between items-center text-base font-bold text-gray-900 border-t border-gray-100 pt-3">
                <span>Total a pagar</span>
                <span className="text-2xl font-black text-[#ff6b6b]"> {formatPrice(finalTotal)} MXN</span>
              </div>
            </div>

            {/* Botón Final de Pago */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#ff6b6b] hover:bg-[#ff5252] disabled:bg-gray-300 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/20 transition-all duration-200 flex items-center justify-center gap-2 text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Procesando Pago...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Pagar { formatPrice(finalTotal)} MXN
                </>
              )}
            </button>

            <p className="text-xs text-center text-gray-400">
              Al hacer clic aceptaste nuestros términos y políticas de privacidad.
            </p>
          </div>
        </div>

      </form>
    </div>
  );
}