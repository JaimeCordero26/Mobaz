import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1e3a5f 0%, #1a5276 40%, #1e8449 100%)",
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            rgba(255,255,255,0.3) 0px,
            rgba(255,255,255,0.3) 1px,
            transparent 1px,
            transparent 60px
          )`,
        }}
      />

      {/* Main content — grows to fill, centers vertically */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            <span className="text-white/90 text-sm font-medium">
              Más de 23 años construyendo sueños
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Tu visión,{" "}
            <span
              className="text-transparent bg-clip-text block sm:inline"
              style={{ backgroundImage: "linear-gradient(90deg, #4ade80, #22c55e)" }}
            >
              nuestra construcción
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
            Especialistas en construcción residencial y comercial, remodelaciones,
            acabados y todo lo que necesitás para hacer realidad tu proyecto.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16">
            <a
              href="#portafolio"
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Ver Proyectos
            </a>
            <a
              href="#contacto"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/30 text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-200 backdrop-blur-sm"
            >
              Contáctanos
            </a>
          </div>

          {/* Stats */}
          <div className="border-t border-white/20 pt-8 grid grid-cols-3 gap-4 sm:gap-8">
            {[
              { number: "150+", label: "Proyectos" },
              { number: "23+", label: "Años de exp." },
              { number: "100%", label: "Satisfacción" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400">
                  {stat.number}
                </div>
                <div className="text-white/60 text-xs sm:text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll arrow — fijo al fondo de la sección, nunca se superpone */}
      <div className="relative z-10 flex justify-center pb-6">
        <a
          href="#servicios"
          aria-label="Bajar a servicios"
          className="text-white/50 hover:text-white transition-colors duration-200 animate-bounce"
        >
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
}
