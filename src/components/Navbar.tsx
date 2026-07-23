"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { InstagramIcon, FacebookIcon } from "./SocialIcons";

const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com/mobazcr", Icon: InstagramIcon },
  { name: "Facebook", href: "https://www.facebook.com/share/1DsmeCFA4v/?mibextid=wwXIfr", Icon: FacebookIcon },
];

export default function Navbar() {
  const t = useTranslations("Nav");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (!isOpen) {
        setHidden(y > lastScrollY.current && y > 100);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Bloquea el scroll del body mientras el panel mobile está abierto,
  // y lo cierra solo si la pantalla pasa a desktop (evita que quede
  // "colgado" abierto atrás si se agranda la ventana).
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) setHidden(false);
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const links = [
    { href: "#inicio", label: t("inicio") },
    { href: "#quienes-somos", label: t("quienesSomos") },
    { href: "#servicios", label: t("servicios") },
    { href: "#portafolio", label: t("portafolio") },
    { href: "#contacto", label: t("contacto") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      {/* Wrapper con el transform del auto-hide — separado del <nav> para que
          los hijos "fixed" (backdrop y panel mobile) no queden atrapados
          dentro de su containing block (un ancestro con transform rompe
          position: fixed de sus descendientes). */}
      <div
        className={`transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
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
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="font-medium text-sm text-[#1a1a1a] hover:text-[#b70000] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-4 pl-6 border-l border-[#e6e6e6]">
                <div className="flex items-center gap-3">
                  {SOCIALS.map(({ name, href, Icon }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="text-[#1a1a1a]/50 hover:text-[#b70000] transition-colors duration-200"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
                <LanguageSwitcher className="text-[#1a1a1a]" />
                <a
                  href="#contacto"
                  className="bg-[#b70000] hover:bg-[#960000] text-white px-5 py-2.5 font-semibold transition-colors duration-200 text-sm whitespace-nowrap"
                >
                  {t("cotizar")}
                </a>
              </div>
            </div>

            {/* Mobile menu button — hamburger que se transforma en X */}
            <button
              className="lg:hidden relative z-[70] w-8 h-8 flex flex-col justify-center items-center gap-[6px]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menú"
              aria-expanded={isOpen}
            >
              <span
                className={`block h-0.5 w-6 bg-[#1a1a1a] transition-all duration-300 ease-in-out ${
                  isOpen ? "translate-y-[8px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-[#1a1a1a] transition-all duration-300 ease-in-out ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-[#1a1a1a] transition-all duration-300 ease-in-out ${
                  isOpen ? "-translate-y-[8px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop — cierra el panel al tocar afuera */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 z-[55] ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Panel mobile — overlay fijo que entra desde la derecha, no empuja el contenido */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-[78%] max-w-xs bg-white shadow-2xl z-[60] transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-6 pt-24 pb-8 h-full overflow-y-auto flex flex-col">
          <div className="space-y-1 flex-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-[#1a1a1a] font-medium hover:text-[#b70000] transition-colors py-3 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-center gap-5">
              {SOCIALS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="text-[#1a1a1a]/50 hover:text-[#b70000] transition-colors duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <LanguageSwitcher className="text-[#1a1a1a] w-full justify-center" />
            <a
              href="#contacto"
              className="block bg-[#b70000] hover:bg-[#960000] text-white px-5 py-3 font-semibold text-center transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t("cotizar")}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
