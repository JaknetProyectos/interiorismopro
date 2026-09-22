import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "InteriorismoPro | Diseño de Interiores Online",
    template: "%s | InteriorismoPro",
  },
  description:
    "Transforma tu espacio con InteriorismoPro. Servicios de diseño de interiores online, asesoría personalizada, moodboards, renders 3D y decoración a medida para hogares y espacios comerciales.",
  keywords: [
    "diseño de interiores",
    "interiorismo online",
    "decoración de interiores",
    "asesoría de decoración",
    "diseño de interiores México",
    "renders 3D interiores",
    "home staging",
    "diseño de espacios comerciales",
    "decoración moderna",
    "InteriorismoPro",
  ],
  authors: [{ name: "InteriorismoPro" }],
  creator: "InteriorismoPro",
  publisher: "InteriorismoPro",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // No definimos lang aquí porque lo hará el layout dinámico
    <html suppressHydrationWarning>
      <head>
        
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}