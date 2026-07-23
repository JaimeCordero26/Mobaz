"use client";

import { useState } from "react";
import { Eye, Target, HeartHandshake, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import BuildingSkyline from "./BuildingSkyline";

const TEAM: {
  name: string;
  role: string;
  profession: string;
  code: string;
  photo: string;
  zoom?: boolean;
}[] = [
  { name: "Jason Mora Cordero", role: "roleOwner", profession: "profCivilEngineer", code: "(IC-27071)", photo: "/team/jason.png" },
  { name: "Bryan Mora Cordero", role: "roleOwner", profession: "profElectromechEngineer", code: "(IME-28435)", photo: "/team/bryan.png", zoom: true },
  { name: "Alfonso Castro", role: "roleDirector", profession: "profArchitect", code: "(ARQ-37779)", photo: "/team/alfonso.png", zoom: true },
  { name: "Tatiana Fonseca Fernández", role: "roleDirectorF", profession: "profArchitectF", code: "(ARQ-29725)", photo: "/team/tatiana.png" },
  { name: "Douglas Melgara", role: "roleDirector", profession: "profCivilEngineer", code: "", photo: "/team/douglas.png", zoom: true },
];

export default function QuienesSomos() {
  const t = useTranslations("QuienesSomos");
  const [open, setOpen] = useState<number | null>(null);

  const pillars = [
    { icon: Target, title: t("misionTitle"), text: t("misionText") },
    { icon: Eye, title: t("visionTitle"), text: t("visionText") },
    { icon: HeartHandshake, title: t("valoresTitle"), text: t("valoresText") },
  ];

  return (
    <section id="quienes-somos" className="relative overflow-hidden py-24 bg-[#e6e6e6]">
      <BuildingSkyline className="absolute -bottom-6 -right-16 w-[420px] h-[210px] text-[#1a1a1a]/[0.06] pointer-events-none hidden md:block" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header general de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">
            {t("title")}
          </h2>
        </div>

        {/* Bento: intro, misión/visión/valores y equipo en un solo bloque */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(140px,auto)] gap-4">
          {/* Intro — la historia de la empresa, con "Quiénes Somos" como título */}
          <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2 bg-white border border-[#e6e6e6] p-8 flex flex-col justify-center gap-3">
            <h3 className="text-2xl font-bold text-[#b70000]">{t("label")}</h3>
            <p className="text-[#1a1a1a]/60 text-lg leading-relaxed">{t("intro")}</p>
          </div>

          {/* Misión / Visión / Valores — tabs desplegables */}
          <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2 bg-white border border-[#e6e6e6] divide-y divide-[#e6e6e6] flex flex-col justify-center">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              const isOpen = open === i;
              return (
                <div key={p.title}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center gap-3 px-5 py-4 text-left"
                  >
                    <Icon size={18} className="text-[#b70000] flex-shrink-0" />
                    <span className="flex-1 font-bold text-[#1a1a1a]">{p.title}</span>
                    <ChevronDown
                      size={18}
                      className={`text-[#1a1a1a]/40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-[#1a1a1a]/60 leading-relaxed text-sm">
                        {p.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Equipo — intro compacta */}
          <div className="sm:col-span-2 lg:col-span-4 bg-[#1a1a1a] p-6 flex flex-col justify-center">
            <span className="text-[#ff5a5a] font-semibold text-xs uppercase tracking-widest">
              {t("teamLabel")}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
              {t("teamTitle")}
            </h3>
            <p className="text-white/60 text-sm mt-1">{t("teamIntro")}</p>
          </div>

          {/* Equipo — miembros */}
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="bg-white p-6 text-center border border-transparent hover:border-[#b70000] transition-colors duration-300"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-[#e6e6e6] shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.photo}
                  alt={member.name}
                  className={`w-full h-full object-cover ${member.zoom ? "scale-125" : ""}`}
                />
              </div>
              <h4 className="font-bold text-[#1a1a1a] leading-snug text-sm">{member.name}</h4>
              <p className="text-[#b70000] text-xs font-semibold uppercase tracking-wide mt-1">
                {t(member.role)}
              </p>
              <p className="text-[#1a1a1a]/50 text-xs mt-2">
                {t(member.profession)} {member.code}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
