import { MessageCircle } from "lucide-react";

const CONTACTS = [
  { name: "Jason Mora", phone: "83276566" },
  { name: "Bryan Mora", phone: "83425820" },
];

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
                { href: "#nosotros", label: "Nosotros" },
                { href: "#equipo", label: "Equipo" },
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
              {CONTACTS.map((contact) => (
                <a
                  key={contact.name}
                  href={`https://wa.me/506${contact.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <MessageCircle size={16} className="text-[#b70000]" />
                  {contact.name} — {contact.phone.slice(0, 4)}-{contact.phone.slice(4)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-500 text-sm">
          <span>© {currentYear} Mobaz. Todos los derechos reservados.</span>
          <a
            href="https://sacortech.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
          >
            Desarrollado por Sacortech<span className="align-super text-[10px] ml-0.5">™</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
