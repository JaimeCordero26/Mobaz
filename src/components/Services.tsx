import { PenTool, HardHat, ClipboardList } from "lucide-react";
import BuildingSkyline from "./BuildingSkyline";

const pillars = [
  {
    icon: PenTool,
    title: "Diseño",
    description: "Planos y especialidades técnicas listas para construir o tramitar.",
    items: ["Civil", "Eléctrico", "Mecánico", "Arquitectónico", "Topográfico"],
  },
  {
    icon: HardHat,
    title: "Construcción",
    description: "Ejecución de obra con la calidad y el acompañamiento de siempre.",
    items: ["Residencial", "Comercial", "Urbanístico", "Remodelaciones"],
  },
  {
    icon: ClipboardList,
    title: "Administración",
    description: "Manejo integral del proyecto de principio a fin.",
    items: ["Presupuestos", "Inspecciones privadas", "Administración de proyectos", "Tramitología"],
  },
];

export default function Services() {
  return (
    <section id="servicios" className="relative overflow-hidden py-24 bg-[#e6e6e6]">
      <BuildingSkyline flip className="absolute -top-4 -left-16 w-[420px] h-[210px] text-[#1a1a1a]/[0.06] pointer-events-none hidden md:block" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#b70000] font-semibold text-sm uppercase tracking-widest">
            Lo que hacemos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mt-2 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-[#1a1a1a]/60 text-lg max-w-2xl mx-auto">
            Tres servicios independientes: diseño, construcción y administración.
            Elegí uno, dos o los tres — vos decidís qué necesitás de nosotros.
          </p>
        </div>

        {/* Pilares */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white p-8 border border-[#e6e6e6] hover:border-[#b70000] transition-colors duration-300 group flex flex-col"
              >
                <div className="w-14 h-14 bg-[#1a1a1a] group-hover:bg-[#b70000] flex items-center justify-center mb-5 transition-colors duration-300">
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-[#1a1a1a]/60 leading-relaxed mb-6">{pillar.description}</p>
                <ul className="space-y-2.5 mt-auto pt-6 border-t border-[#e6e6e6]">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[#1a1a1a]/80">
                      <span className="w-1.5 h-1.5 bg-[#b70000] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-[#333d73] hover:bg-[#1a1a1a] text-white font-bold px-8 py-4 text-lg transition-colors duration-200"
          >
            Solicitar cotización gratuita
          </a>
        </div>
      </div>
    </section>
  );
}
