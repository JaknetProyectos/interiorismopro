"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useServices } from "@/hooks/useServices";
import { Service } from "@/types/service";
import { ServiceOption } from "@/types/service-option";

export interface CartItem {
  id: string; // ID de la variante (variantId)
  quantity: number;
  customPrice?: number; // Permite almacenar el precio personalizado si aplica
  meta?: {
    folio?: string;
    nombre?: string;
    apellidos?: string;
    email?: string;
    descripcion?: string;
  };
}

// Objeto procesado con la información traducida en tiempo real
export interface EnrichedCartItem extends CartItem {
  service: Service | null;
  selectedOption: ServiceOption | null;
  price: number;
  subtotal: number;
}

interface CartContextType {
  items: EnrichedCartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number; customPrice?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [rawItems, setRawItems] = useState<CartItem[]>([]);
  const { services } = useServices();
  const [isLoaded, setIsLoaded] = useState(false);
  const CART_STORAGE_KEY = "decora_cart";

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setRawItems(JSON.parse(saved) as CartItem[]);
      }
    } catch (error) {
      console.error("Error loading cart from storage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Guardar en localStorage ante cambios
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(rawItems));
    } catch (error) {
      console.error("Error saving cart to storage:", error);
    }
  }, [rawItems, isLoaded]);

  // Enriquecer items con traducciones dinámicas según el locale actual
  const items = useMemo(() => {
    return rawItems.map((raw) => {
      let selectedOption: ServiceOption | null = null;

      const service =
        services.find((s) => {
          const opt = s.options.find((o) => o.id === raw.id);
          if (opt) {
            selectedOption = opt;
            return true;
          }
          return false;
        }) || null;

      // Si existe customPrice lo respeta; si no, toma el de la opción traducida o 0
      const price =
        raw.customPrice !== undefined && raw.customPrice > 0
          ? raw.customPrice
          : selectedOption
            ? (selectedOption as ServiceOption).price
            : 0;

      const subtotal = price * raw.quantity;

      return {
        ...raw,
        service,
        selectedOption,
        price,
        subtotal,
      };
    });
  }, [rawItems, services]);

  const addItem = (
    newItem: Omit<CartItem, "quantity"> & { quantity?: number; customPrice?: number }
  ) => {
    const qty = newItem.quantity ?? 1;

    setRawItems((prev) => {
      // Si tiene precio personalizado, distinguimos por ID y customPrice para no agrupar montos distintos
      const existing = prev.find(
        (i) => i.id === newItem.id && i.customPrice === newItem.customPrice
      );

      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id && i.customPrice === newItem.customPrice
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }

      return [...prev, { ...newItem, quantity: qty }];
    });
  };

  const removeItem = (id: string) => {
    setRawItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return removeItem(id);
    setRawItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setRawItems([]);

  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.subtotal, 0),
    [items]
  );

  const itemCount = useMemo(
    () => rawItems.reduce((acc, item) => acc + item.quantity, 0),
    [rawItems]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}