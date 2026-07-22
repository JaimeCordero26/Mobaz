"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

const HERO_IMAGES = [
  "https://pub-739100353d314d7d9e833e57b96109d3.r2.dev/1783619737454-8ylckyk4u9h.jpg",
  "https://pub-739100353d314d7d9e833e57b96109d3.r2.dev/1783619700493-ng7ogstzzwh.jpg",
  "https://pub-739100353d314d7d9e833e57b96109d3.r2.dev/1783619721062-755bzmn74p5.jpg",
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % HERO_IMAGES.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#1a1a1a]"
    >
      {/* Fondo — fotos de proyectos reales, crossfade lento */}
      <div className="absolute inset-0" aria-hidden="true">
        {HERO_IMAGES.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms]"
            style={{ opacity: i === active ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      {/* Main content — grows to fill, centers vertically */}
      <div className="relative flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-white/25 bg-black/20 backdrop-blur-sm px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-[#b70000] flex-shrink-0" />
            <span className="text-white/85 text-sm font-medium">
              Más de 10 años construyendo sueños
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
            <span className="block text-white">Construcción</span>
            <span className="block text-white">
              <span className="text-[#ff5a5a]">+</span> Arquitectura
            </span>
            <span className="block text-white">
              <span className="text-[#ff5a5a]">+</span> Ingeniería
            </span>
          </h1>

          {/* Slogan */}
          <p className="text-lg sm:text-xl font-semibold text-[#ff8080] italic mb-4">
            Su constructora amiga
          </p>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
            Especialistas en construcción residencial y comercial, remodelaciones,
            acabados y todo lo que necesitás para hacer realidad tu proyecto.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16">
            <a
              href="#portafolio"
              className="w-full sm:w-auto bg-[#b70000] hover:bg-[#960000] text-white font-bold px-8 py-4 text-base transition-colors duration-200"
            >
              Ver Proyectos
            </a>
            <a
              href="#contacto"
              className="w-full sm:w-auto border border-white/70 text-white hover:border-[#b70000] hover:text-[#ff8080] font-bold px-8 py-4 text-base transition-colors duration-200"
            >
              Contáctanos
            </a>
          </div>

          {/* Stats */}
          <div className="border-t border-white/20 pt-8 grid grid-cols-3 gap-4 sm:gap-8">
            {[
              { number: "✔", label: "Múltiples proyectos" },
              { number: "10+", label: "Años de exp." },
              { number: "100%", label: "Satisfacción" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ff5a5a]">
                  {stat.number}
                </div>
                <div className="text-white/60 text-xs sm:text-sm mt-1">{stat.label}</div>
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
          className="text-white/60 hover:text-white transition-colors duration-200 animate-bounce"
        >
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
}
