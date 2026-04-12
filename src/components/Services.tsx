import {
  Home,
  Building2,
  Hammer,
  PaintBucket,
  HardHat,
  Wrench,
} from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Casas Residenciales",
    description:
      "Construimos la casa de tus sueños desde cero, con los mejores materiales y acabados de alta calidad.",
    color: "bg-blue-50 text-blue-600",
    border: "border-blue-100",
  },
  {
    icon: Building2,
    title: "Edificios y Apartamentos",
    description:
      "Proyectos de gran escala: edificios de oficinas, condominios y complejos de apartamentos.",
    color: "bg-green-50 text-green-600",
    border: "border-green-100",
  },
  {
    icon: Hammer,
    title: "Remodelaciones",
    description:
      "Transformamos tu espacio existente. Remodelamos cocinas, baños, fachadas y espacios completos.",
    color: "bg-blue-50 text-blue-600",
    border: "border-blue-100",
  },
  {
    icon: PaintBucket,
    title: "Acabados y Pintura",
    description:
      "Acabados de lujo, cerámica, cielos rasos, repello, pintura interior y exterior de calidad.",
    color: "bg-green-50 text-green-600",
    border: "border-green-100",
  },
  {
    icon: HardHat,
    title: "Construcción Comercial",
    description:
      "Locales comerciales, bodegas, instalaciones industriales y proyectos de infraestructura.",
    color: "bg-blue-50 text-blue-600",
    border: "border-blue-100",
  },
  {
    icon: Wrench,
    title: "Mantenimiento y Arreglos",
    description:
      "Reparaciones estructurales, impermeabilización, instalaciones eléctricas e hidráulicas.",
    color: "bg-green-50 text-green-600",
    border: "border-green-100",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24" style={{ background: "linear-gradient(160deg, #f0f4ff 0%, #e8f5f0 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">
            Lo que hacemos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
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
                className={`bg-white rounded-2xl p-8 border ${service.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
              >
                <div
                  className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={26} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Solicitar cotización gratuita
          </a>
        </div>
      </div>
    </section>
  );
}
