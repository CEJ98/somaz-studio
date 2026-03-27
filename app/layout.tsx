import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://somazstudio.com"),
  title: {
    default: "Somaz Studio | Arquitectura de Vanguardia — Ciudad de México",
    template: "%s | Somaz Studio",
  },
  description:
    "Somaz Studio es un estudio de arquitectura de vanguardia en Ciudad de México. Diseñamos espacios que inspiran, perduran y transforman la manera en que vivimos.",
  keywords: ["arquitectura", "diseño", "estudio", "interiores", "urbanismo", "México", "CDMX"],
  authors: [{ name: "Somaz Studio" }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Somaz Studio",
    title: "Somaz Studio | Arquitectura de Vanguardia — Ciudad de México",
    description:
      "Estudio de arquitectura en Ciudad de México dedicado a crear espacios que inspiran y transforman.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Somaz Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Somaz Studio | Arquitectura de Vanguardia",
    description: "Estudio de arquitectura en Ciudad de México.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Somaz Studio",
  description:
    "Estudio de arquitectura de vanguardia en Ciudad de México. Diseñamos espacios residenciales, comerciales, culturales y urbanos.",
  url: "https://somazstudio.com",
  logo: "https://somazstudio.com/og-image.jpg",
  foundingDate: "2009",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Presidente Masaryk 111",
    addressLocality: "Polanco",
    addressRegion: "Ciudad de México",
    postalCode: "11560",
    addressCountry: "MX",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.4318,
    longitude: -99.1927,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+52-55-1234-5678",
    email: "hola@somazstudio.mx",
    contactType: "customer service",
    availableLanguage: ["Spanish", "English"],
  },
  serviceArea: {
    "@type": "Place",
    name: "Worldwide",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Arquitectura",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Arquitectura Residencial" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Arquitectura Comercial" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Arquitectura Cultural" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Urbanismo y Planeación" } },
    ],
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
        {/* Google Fonts loaded by browser at runtime */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-paper text-ink antialiased cursor-none md:cursor-none">
        <CustomCursor />
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
