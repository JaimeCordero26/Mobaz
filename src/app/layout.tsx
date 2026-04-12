import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "SC Servicios Constructivos",
  description: "Construcción de casas, edificios, apartamentos, remodelaciones y más. Tu visión, nuestra construcción.",
  keywords: "construcción, casas, edificios, apartamentos, remodelaciones, Costa Rica",
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
      <body className={`${inter.className} min-h-full antialiased`}>{children}</body>
    </html>
  );
}
