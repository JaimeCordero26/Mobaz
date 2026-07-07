import { MessageCircle, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-white.png" alt="Mobaz" className="h-10 w-auto object-contain mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Construcción + Arquitectura. Tu proyecto es nuestra pasión.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-200 mb-4">Navegación</h4>
            <ul className="space-y-2">
              {[
                { href: "#inicio", label: "Inicio" },
                { href: "#servicios", label: "Servicios" },
                { href: "#portafolio", label: "Portafolio" },
                { href: "#contacto", label: "Contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#b70000] text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-200 mb-4">Contacto directo</h4>
            <div className="space-y-3">
              <a
                href="tel:+50688035690"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Phone size={16} className="text-[#b70000]" />
                8803-5690
              </a>
              <a
                href="https://wa.me/50688035690"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <MessageCircle size={16} className="text-[#b70000]" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-500 text-sm">
          © {currentYear} Mobaz. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
