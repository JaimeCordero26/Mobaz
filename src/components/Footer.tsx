import { MessageCircle, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-3">
              SC{" "}
              <span className="text-green-400">Servicios Constructivos</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Construyendo sueños con calidad, experiencia y compromiso. Tu
              proyecto es nuestra pasión.
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
                    className="text-gray-400 hover:text-green-400 text-sm transition-colors"
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
                <Phone size={16} className="text-blue-400" />
                8803-5690
              </a>
              <a
                href="https://wa.me/50688035690"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <MessageCircle size={16} className="text-green-400" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          © {currentYear} SC Servicios Constructivos. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
