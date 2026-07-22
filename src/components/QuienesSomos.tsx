import { Eye, Target, HeartHandshake } from "lucide-react";
import { getTranslations } from "next-intl/server";
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

export default async function QuienesSomos() {
  const t = await getTranslations("QuienesSomos");

  const pillars = [
    { icon: Target, title: t("misionTitle"), text: t("misionText") },
    { icon: Eye, title: t("visionTitle"), text: t("visionText") },
    { icon: HeartHandshake, title: t("valoresTitle"), text: t("valoresText") },
  ];

  return (
    <section id="quienes-somos" className="relative overflow-hidden py-24 bg-[#e6e6e6]">
      <BuildingSkyline className="absolute -bottom-6 -right-16 w-[420px] h-[210px] text-[#1a1a1a]/[0.06] pointer-events-none hidden md:block" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#b70000] font-semibold text-sm uppercase tracking-widest">
            {t("label")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mt-2 mb-4">
            {t("title")}
          </h2>
          <p className="text-[#1a1a1a]/60 text-lg max-w-3xl mx-auto leading-relaxed">
            {t("intro")}
          </p>
        </div>

        {/* Misión / Visión / Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="bg-white p-8 border border-[#e6e6e6]">
                <div className="w-14 h-14 bg-[#1a1a1a] flex items-center justify-center mb-5">
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{p.title}</h3>
                <p className="text-[#1a1a1a]/60 leading-relaxed">{p.text}</p>
              </div>
            );
          })}
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
