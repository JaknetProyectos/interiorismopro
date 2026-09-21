import { Service } from "@/types/service";

export const servicesEnglish: Service[] = [
    {
        id: "custom",
        title: "Custom Service",
        idealFor: "Clients with specific requirements or special projects needing flexible pricing.",
        options: [
            {
                id: "custom-product",
                price: 0
            }
        ],
        features: ["Set the exact amount for your project or service by adjusting the price as agreed with our team."],
    },
    {
        id: "virtual-consulting",
        title: "Virtual design consulting",
        idealFor: "Those who want quick ideas without a complete redesign.",
        options: [{ id: "vc-1", price: 1800 }],
        features: [
            "Video call session (15 min) to review the space and discuss needs.",
            "General recommendations on layout, colors, lighting and furniture.",
            "PDF with personalized suggestions and tips.",
        ],
    },
    {
        id: "room-makeover",
        title: "Room makeover",
        idealFor: "Living rooms, bedrooms, kitchens, home offices, bathrooms, etc.",
        options: [{ id: "rm-1", price: 3600 }],
        features: [
            "Mood board (inspiration board)",
            "Suggested color palette.",
            "List of furniture and accessories with purchase links (shopping list).",
            "2D layout plan.",
        ],
    },
    {
        id: "complete-design",
        title: "Complete online interior design",
        idealFor: "People who are moving, remodeling their house or vacation apartments.",
        options: [
            { id: "cd-1", variant: "Small space (1 room, small living room)", price: 15000 },
            { id: "cd-2", variant: "Medium-sized apartment (2 bedrooms, 80-120 m²)", price: 32000 },
            { id: "cd-3", variant: "Large house/project (> 150-200 m²)", price: 65000 },
        ],
        features: [
            "Virtual survey of the space (with measurements from the client or photos).",
            "2D plans (layout, lighting, distribution).",
            "Moodboard + materials palette.",
            "3D renderings or virtual tour.",
            "Shopping list with local suppliers.",
            "Implementation manual for the client to execute with a contractor.",
        ],
    },
    {
        id: "home-staging",
        title: "Virtual home staging",
        idealFor: "Real estate agents or owners who want to speed up the sale/rental.",
        options: [{ id: "hs-1", price: 8600 }],
        features: [
            "Visual design of the space for selling or renting a property.",
            "Render with virtual furniture (no need to buy furniture).",
            "Focus on highlighting the property's strengths.",
        ],
    },
    {
        id: "commercial-design",
        title: "Design for commercial spaces",
        idealFor: "Entrepreneurs, offices, boutiques, cafes, coworkings.",
        options: [
            { id: "cds-1", variant: "Small office / very small premises (20-40 m²)", price: 10300 },
            { id: "cds-2", variant: "Moderate office space / premises + several rooms (50-100 m²)", price: 28000 },
            { id: "cds-3", variant: "Small office with strong brand identity / decorative pieces / special lighting / complex signage", price: 65100 },
        ],
        features: [
            "Efficient furniture layout.",
            "Suggested colors and materials to reflect brand identity.",
            "Lighting, signage and decoration proposal.",
            "Budget-optimized shopping list.",
        ],
    },
    {
        id: "3d-renders",
        title: "3D renders or virtual tours",
        idealFor: "Complementary or independent service.",
        options: [
            { id: "3d-1", variant: "Static 3D render (1 image, small space, medium quality)", price: 2700 },
            { id: "3d-2", variant: "Multiple renders / 5 images from different angles", price: 7600 },
            { id: "3d-3", variant: "360° / panoramic render (one scene)", price: 9500 },
            { id: "3d-4", variant: "Complete interactive virtual tour (multiple scenes, multiple spaces, navigation, etc.)", price: 46200 },
        ],
        features: [
            "3D space modeling (from measurements or plans).",
            "Texturing, lighting and ambiance.",
            "Exporting images or interactive tour.",
        ],
    },
    {
        id: "diy-advice",
        title: "DIY (do it yourself) decorating advice",
        idealFor: "Young people, students, temporary rentals, creative clients.",
        options: [
            { id: "diy-1", variant: "Short session, small space (one room/area, 20 min), basic recommendations + materials list", price: 700 },
            { id: "diy-2", variant: "1-hour session + mood board or color palette + materials list + detailed instructions", price: 3100 },
            { id: "diy-3", variant: "More comprehensive DIY advice (multiple rooms, follow-up, several options, PDF with images, simple layout plan)", price: 5300 },
        ],
        features: [
            "Low-cost suggestions for renovating a space without construction work.",
            "Step-by-step instructions for painting, wallpapering, rearranging, or decorating.",
            "List of inexpensive materials.",
        ],
    },
];

export const servicesSpanish: Service[] = [
    {
        id: "virtual-consulting",
        title: "Asesoría virtual de diseño",
        idealFor: "Quienes buscan ideas rápidas sin una remodelación completa.",
        options: [{ id: "vc-1", price: 1800 }],
        features: [
            "Sesión por videollamada (15 min) para revisar el espacio y conversar sobre necesidades.",
            "Recomendaciones generales sobre distribución, colores, iluminación y mobiliario.",
            "PDF con sugerencias y consejos personalizados.",
        ],
    },
    {
        id: "room-makeover",
        title: "Renovación de habitación",
        idealFor: "Salas, recámaras, cocinas, oficinas en casa, baños, etc.",
        options: [{ id: "rm-1", price: 3600 }],
        features: [
            "Mood board (tablero de inspiración)",
            "Paleta de color sugerida.",
            "Lista de mobiliario y accesorios con enlaces de compra (shopping list).",
            "Plano de distribución 2D.",
        ],
    },
    {
        id: "complete-design",
        title: "Diseño de interiores online completo",
        idealFor: "Personas que se mudan, remodelan su casa o departamentos vacacionales.",
        options: [
            { id: "cd-1", variant: "Espacio pequeño (1 recámara, sala pequeña)", price: 15000 },
            { id: "cd-2", variant: "Departamento mediano (2 recámaras, 80-120 m²)", price: 32000 },
            { id: "cd-3", variant: "Casa/proyecto grande (> 150-200 m²)", price: 65000 },
        ],
        features: [
            "Levantamiento virtual del espacio (con medidas del cliente o fotos).",
            "Planos 2D (distribución, iluminación, acomodo).",
            "Moodboard + paleta de materiales.",
            "Renders 3D o recorrido virtual.",
            "Lista de compras con proveedores locales.",
            "Manual de implementación para ejecutar con un contratista.",
        ],
    },
    {
        id: "home-staging",
        title: "Home staging virtual",
        idealFor: "Agentes inmobiliarios o propietarios que quieran agilizar la venta/renta.",
        options: [{ id: "hs-1", price: 8600 }],
        features: [
            "Diseño visual del espacio para vender o rentar un inmueble.",
            "Render con mobiliario virtual (sin necesidad de comprar muebles).",
            "Enfoque en resaltar las fortalezas de la propiedad.",
        ],
    },
    {
        id: "commercial-design",
        title: "Diseño para espacios comerciales",
        idealFor: "Emprendedores, oficinas, boutiques, cafeterías, coworkings.",
        options: [
            { id: "cds-1", variant: "Oficina pequeña / local muy pequeño (20-40 m²)", price: 10300 },
            { id: "cds-2", variant: "Espacio de oficina moderado / local + varias habitaciones (50-100 m²)", price: 28000 },
            { id: "cds-3", variant: "Oficina pequeña con fuerte identidad de marca / piezas decorativas / iluminación especial / señalética compleja", price: 65100 },
        ],
        features: [
            "Distribución eficiente del mobiliario.",
            "Colores y materiales sugeridos para reflejar la identidad de marca.",
            "Propuesta de iluminación, señalética y decoración.",
            "Shopping list optimizada al presupuesto.",
        ],
    },
    {
        id: "3d-renders",
        title: "Renders 3D o recorridos virtuales",
        idealFor: "Servicio complementario o independiente.",
        options: [
            { id: "3d-1", variant: "Render 3D estático (1 imagen, espacio pequeño, calidad media)", price: 2700 },
            { id: "3d-2", variant: "Múltiples renders / 5 imágenes desde diferentes ángulos", price: 7600 },
            { id: "3d-3", variant: "Render 360° / panorámico (una escena)", price: 9500 },
            { id: "3d-4", variant: "Recorrido virtual interactivo completo (múltiples escenas, varios espacios, navegación, etc.)", price: 46200 },
        ],
        features: [
            "Modelado 3D del espacio (a partir de medidas o planos).",
            "Texturizado, iluminación y ambientación.",
            "Exportación de imágenes o tour interactivo.",
        ],
    },
    {
        id: "diy-advice",
        title: "Asesoría DIY (hazlo tú mismo) en decoración",
        idealFor: "Jóvenes, estudiantes, rentas temporales, clientes creativos.",
        options: [
            { id: "diy-1", variant: "Sesión corta, espacio pequeño (una habitación/área, 20 min), recomendaciones básicas + lista de materiales", price: 700 },
            { id: "diy-2", variant: "Sesión de 1 hora + mood board o paleta de color + lista de materiales + instrucciones detalladas", price: 3100 },
            { id: "diy-3", variant: "Asesoría DIY más completa (múltiples habitaciones, seguimiento, varias opciones, PDF con imágenes, plano simple)", price: 5300 },
        ],
        features: [
            "Sugerencias de bajo costo para renovar un espacio sin obra.",
            "Instrucciones paso a paso para pintar, empapelar, reacomodar o decorar.",
            "Lista de materiales económicos.",
        ],
    },
    {
        id: "custom",
        title: "Producto / Servicio a la Medida",
        idealFor: "Clientes con requerimientos específicos o proyectos especiales que requieren una cotización flexible.",
        options: [
            {
                id: "custom-product",
                price: 0
            }
        ],
        features: ["Define el monto exacto de tu proyecto o servicio ajustando el precio según lo acordado con nuestro equipo."],
    },
];
