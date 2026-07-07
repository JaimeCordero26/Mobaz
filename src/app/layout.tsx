import type { Metadata, Viewport } from "next";
import { Albert_Sans, Overpass } from "next/font/google";
import "./globals.css";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-albert-sans",
});

const overpass = Overpass({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-overpass",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Mobaz | Construcción + Arquitectura",
  description: "Mobaz: consultoría, construcción y arquitectura. Tu visión, nuestra construcción.",
  keywords: "construcción, arquitectura, consultoría, remodelaciones, Costa Rica, Mobaz",
  icons: {
    icon: "/api/logo",
    apple: "/api/logo",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body className={`${albertSans.variable} ${overpass.variable} min-h-full antialiased`}>{children}</body>
    </html>
  );
}
