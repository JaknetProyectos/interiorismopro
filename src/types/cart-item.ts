import { Service } from "./service";

export interface CartItem {
    // Campos indispensables para búsqueda
    id: string;
    price: number;
    quantity: number;

    // Para proyecto personalizado, estos dependen de cada sitio y aquí no importa realmente el idioma
    meta?: {
        folio?: string;
        nombre?: string;
        apellidos?: string;
        email?: string;
        descripcion?: string;
    };
}

export interface EmailItem {
    id: string;
    price: number;
    quantity: number;
    image?: string;
    description?: string;
}