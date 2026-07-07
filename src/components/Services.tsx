import {
  Home,
  Building2,
  Hammer,
  PaintBucket,
  HardHat,
  Wrench,
} from "lucide-react";
import BuildingSkyline from "./BuildingSkyline";

const services = [
  {
    icon: Home,
    title: "Casas Residenciales",
    description:
      "Construimos la casa de tus sueños desde cero, con los mejores materiales y acabados de alta calidad.",
  },
  {
    icon: Building2,
    title: "Edificios y Apartamentos",
    description:
      "Proyectos de gran escala: edificios de oficinas, condominios y complejos de apartamentos.",
  },
  {
    icon: Hammer,
    title: "Remodelaciones",
    description:
      "Transformamos tu espacio existente. Remodelamos cocinas, baños, fachadas y espacios completos.",
  },
  {
    icon: PaintBucket,
    title: "Acabados y Pintura",
    description:
      "Acabados de lujo, cerámica, cielos rasos, repello, pintura interior y exterior de calidad.",
  },
  {
    icon: HardHat,
    title: "Construcción Comercial",
    description:
      "Locales comerciales, bodegas, instalaciones industriales y proyectos de infraestructura.",
  },
  {
    icon: Wrench,
    title: "Mantenimiento y Arreglos",
    description:
      "Reparaciones estructurales, impermeabilización, instalaciones eléctricas e hidráulicas.",
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
            Ofrecemos soluciones integrales de construcción para proyectos
            residenciales, comerciales y de remodelación.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white p-8 border border-[#e6e6e6] hover:border-[#b70000] transition-colors duration-300 group"
              >
                <div className="w-14 h-14 bg-[#1a1a1a] group-hover:bg-[#b70000] flex items-center justify-center mb-5 transition-colors duration-300">
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">
                  {service.title}
                </h3>
                <p className="text-[#1a1a1a]/60 leading-relaxed">{service.description}</p>
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
