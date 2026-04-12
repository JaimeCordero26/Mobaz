"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Start as true so we always try to render the img — no text flash
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#inicio", label: "Inicio" },
    { href: "#servicios", label: "Servicios" },
    { href: "#portafolio", label: "Portafolio" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-lg backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-2">

          {/* Logo — solo img, sin texto fallback visible hasta que falle */}
          <a href="#inicio" className="flex items-center flex-shrink-0 min-w-0">
            {!logoError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/api/logo"
                alt="SC Servicios Constructivos"
                className="h-12 sm:h-14 w-auto object-contain max-w-[200px] sm:max-w-xs"
                onError={() => setLogoError(true)}
              />
            ) : (
              /* Solo se muestra si el archivo de logo no existe */
              <span className={`text-base sm:text-xl font-bold tracking-tight leading-tight ${scrolled ? "text-blue-700" : "text-white"}`}>
                SC <span className={scrolled ? "text-green-600" : "text-green-400"}>Servicios Constructivos</span>
              </span>
            )}
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors duration-200 hover:text-green-500 text-sm ${
                  scrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full font-semibold transition-colors duration-200 text-sm shadow-md"
            >
              Cotizar
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-1 ${scrolled ? "text-gray-700" : "text-white"}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menú"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl border-t border-gray-100">
          <div className="px-4 py-5 space-y-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-gray-700 font-medium hover:text-green-600 transition-colors py-1"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="block bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-full font-semibold text-center transition-colors mt-2"
              onClick={() => setIsOpen(false)}
            >
              Cotizar
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
