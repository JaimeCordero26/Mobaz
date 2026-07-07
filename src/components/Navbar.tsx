"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-2">
          {/* Logo */}
          <a href="#inicio" className="flex items-center flex-shrink-0 min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/logo.png"
              alt="Mobaz"
              className="h-10 sm:h-12 w-auto object-contain max-w-[160px] sm:max-w-xs"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-medium text-sm text-[#1a1a1a] hover:text-[#b70000] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="bg-[#b70000] hover:bg-[#960000] text-white px-5 py-2.5 font-semibold transition-colors duration-200 text-sm"
            >
              Cotizar
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-1 text-[#1a1a1a]"
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
                className="block text-[#1a1a1a] font-medium hover:text-[#b70000] transition-colors py-1"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="block bg-[#b70000] hover:bg-[#960000] text-white px-5 py-3 font-semibold text-center transition-colors mt-2"
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
