import { useMemo } from "react";
import { useServices } from "./useServices"; // Ajusta la ruta a tu hook
import { Service } from "@/types/service";
import { ServiceOption } from "@/types/service-option";


interface UseServiceByVariantReturn {
    service: Service | null;
    selectedOption: ServiceOption | null;
    price: number | null;
}

export function useServiceByVariant(
    variantId?: string
): UseServiceByVariantReturn {
    const { services } = useServices();

    return useMemo(() => {
        if (!variantId) {
            return { service: null, selectedOption: null, price: null };
        }

        // Buscamos directamente el servicio que contenga la variante requerida
        let selectedOption: ServiceOption | null = null;

        const service =
            services.find((s: Service) => {
                const option = s.options.find((opt) => opt.id === variantId);
                if (option) {
                    selectedOption = option;
                    return true;
                }
                return false;
            }) || null;

        return {
            service,
            selectedOption,
            price: selectedOption ? (selectedOption as ServiceOption).price : null,
        };
    }, [services, variantId]);
}