import { ArrowDown } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col overflow-hidden bg-white"
    >
      <ParticleBackground />

      {/* Main content — grows to fill, centers vertically */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-[#e6e6e6] px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-[#b70000] flex-shrink-0" />
            <span className="text-[#1a1a1a]/70 text-sm font-medium">
              Más de 23 años construyendo sueños
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="block text-[#1a1a1a]">Construcción</span>
            <span className="block text-[#b70000]">+</span>
            <span className="block text-[#333d73]">Arquitectura</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-[#1a1a1a]/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Especialistas en construcción residencial y comercial, remodelaciones,
            acabados y todo lo que necesitás para hacer realidad tu proyecto.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16">
            <a
              href="#portafolio"
              className="w-full sm:w-auto bg-[#1a1a1a] hover:bg-[#b70000] text-white font-bold px-8 py-4 text-base transition-colors duration-200"
            >
              Ver Proyectos
            </a>
            <a
              href="#contacto"
              className="w-full sm:w-auto border border-[#1a1a1a] text-[#1a1a1a] hover:border-[#b70000] hover:text-[#b70000] font-bold px-8 py-4 text-base transition-colors duration-200"
            >
              Contáctanos
            </a>
          </div>

          {/* Stats */}
          <div className="border-t border-[#e6e6e6] pt-8 grid grid-cols-3 gap-4 sm:gap-8">
            {[
              { number: "✔", label: "Múltiples proyectos" },
              { number: "23+", label: "Años de exp." },
              { number: "100%", label: "Satisfacción" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#b70000]">
                  {stat.number}
                </div>
                <div className="text-[#1a1a1a]/50 text-xs sm:text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll arrow */}
      <div className="relative z-10 flex justify-center pb-6">
        <a
          href="#servicios"
          aria-label="Bajar a servicios"
          className="text-[#1a1a1a]/40 hover:text-[#b70000] transition-colors duration-200 animate-bounce"
        >
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
}
