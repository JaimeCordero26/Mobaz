"use client";

import { useTranslations } from "next-intl";
import { ArrowDown, HardHat } from "lucide-react";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#1a1a1a]"
    >
      {/* Fondo — foto de proyecto real */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/pool-project.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/85" />
      </div>

      {/* Main content — grows to fill, centers vertically */}
      <div className="relative flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          {/* Logo — centro, tamaño moderado */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/logo.png"
            alt="Mobaz"
            className="h-20 sm:h-24 md:h-28 w-auto object-contain mx-auto mb-8"
          />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-white/25 bg-black/20 backdrop-blur-sm px-4 py-2 mb-8">
            <HardHat size={16} className="text-[#ff5a5a] flex-shrink-0" />
            <span className="text-white/85 text-sm font-medium">
              {t("badge")}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
            <span className="block text-white">{t("line1")}</span>
            <span className="block text-white">
              <span className="text-[#ff5a5a]">+</span> {t("line2")}
            </span>
            <span className="block text-white">
              <span className="text-[#ff5a5a]">+</span> {t("line3")}
            </span>
          </h1>

          {/* Slogan */}
          <p className="text-lg sm:text-xl font-semibold text-[#ff8080] italic mb-4">
            {t("slogan")}
          </p>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("subtitle")}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16">
            <a
              href="#portafolio"
              className="w-full sm:w-auto bg-[#b70000] hover:bg-[#960000] text-white font-bold px-8 py-4 text-base transition-colors duration-200"
            >
              {t("ctaProjects")}
            </a>
            <a
              href="#contacto"
              className="w-full sm:w-auto border border-white/70 text-white hover:border-[#b70000] hover:text-[#ff8080] font-bold px-8 py-4 text-base transition-colors duration-200"
            >
              {t("ctaContact")}
            </a>
          </div>

          {/* Stats */}
          <div className="border-t border-white/20 pt-8 grid grid-cols-3 gap-4 sm:gap-8">
            {[
              { number: "✔", label: t("statMultiple") },
              { number: "10+", label: t("statYears") },
              { number: "100%", label: t("statSatisfaction") },
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
