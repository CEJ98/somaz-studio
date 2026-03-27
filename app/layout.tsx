import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Somaz Studio — Arquitectura que Transforma",
    template: "%s | Somaz Studio",
  },
  description:
    "Somaz Studio es un estudio de arquitectura de vanguardia dedicado a diseñar espacios que inspiran, perduran y transforman la manera en que vivimos.",
  keywords: ["arquitectura", "diseño", "estudio", "interiores", "urbanismo", "México"],
  authors: [{ name: "Somaz Studio" }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Somaz Studio",
    title: "Somaz Studio — Arquitectura que Transforma",
    description:
      "Estudio de arquitectura dedicado a crear espacios que inspiran y transforman.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={geistSans.variable}>
      <head>
        {/* Google Fonts – loaded by browser at runtime, not during build */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-paper text-ink antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
