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
        {/* Header + Misión/Visión/Valores combinados */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <span className="text-[#b70000] font-semibold text-sm uppercase tracking-widest">
            {t("label")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mt-2 mb-4">
            {t("title")}
          </h2>
          <p className="text-[#1a1a1a]/60 text-lg leading-relaxed mb-8">
            {t("intro")}
          </p>

          {/* Misión / Visión / Valores — tabs desplegables, texto opcional */}
          <div className="text-left border border-[#e6e6e6] bg-white divide-y divide-[#e6e6e6]">
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
        </div>

        {/* Equipo */}
        <div className="text-center mb-16">
          <span className="text-[#b70000] font-semibold text-sm uppercase tracking-widest">
            {t("teamLabel")}
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mt-2 mb-4">
            {t("teamTitle")}
          </h3>
          <p className="text-[#1a1a1a]/60 text-lg max-w-2xl mx-auto">
            {t("teamIntro")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="bg-white p-6 text-center border border-transparent hover:border-[#b70000] transition-colors duration-300"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-[#e6e6e6] shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.photo}
                  alt={member.name}
                  className={`w-full h-full object-cover ${member.zoom ? "scale-125" : ""}`}
                />
              </div>
              <h4 className="font-bold text-[#1a1a1a] leading-snug">{member.name}</h4>
              <p className="text-[#b70000] text-xs font-semibold uppercase tracking-wide mt-1">
                {t(member.role)}
              </p>
              <p className="text-[#1a1a1a]/50 text-sm mt-2">
                {t(member.profession)} {member.code}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
