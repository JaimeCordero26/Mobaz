import { Eye, Target, HeartHandshake } from "lucide-react";
import BuildingSkyline from "./BuildingSkyline";

const pillars = [
  {
    icon: Target,
    title: "Misión",
    text: "Construir en forma sustentable, con un enfoque en la excelencia, eficiencia y eficacia de los proyectos, logrando satisfacer las necesidades de nuestros clientes, mejorando continuamente.",
  },
  {
    icon: Eye,
    title: "Visión",
    text: "Liderar el mercado de las obras de ingeniería y construcción con calidad y excelencia, con un gran compromiso social, aportando una alta satisfacción a nuestros clientes y colaboradores.",
  },
  {
    icon: HeartHandshake,
    title: "Valores",
    text: "Transparencia, honestidad, pasión, calidad, orientación al cliente y trabajo en equipo. Atendemos clientes pequeños y grandes con un servicio profesional y personalizado.",
  },
];

const TEAM = [
  { name: "Jason Mora Cordero", role: "Propietario y Desarrollador", profession: "Ingeniero Civil (IC-27071)", photo: "/team/jason.png" },
  { name: "Bryan Mora Cordero", role: "Propietario y Desarrollador", profession: "Ingeniero Electromecánico (IME-28435)", photo: "/team/bryan.png", zoom: true },
  { name: "Alfonso Castro", role: "Director de Proyecto", profession: "Arquitecto (ARQ-37779)", photo: "/team/alfonso.png", zoom: true },
  { name: "Tatiana Fonseca Fernández", role: "Directora de Proyecto", profession: "Arquitecta (ARQ-29725)", photo: "/team/tatiana.png" },
  { name: "Douglas Melgara", role: "Director de Proyecto", profession: "Ingeniero Civil", photo: "/team/douglas.png", zoom: true },
];

export default function QuienesSomos() {
  return (
    <section id="quienes-somos" className="relative overflow-hidden py-24 bg-[#e6e6e6]">
      <BuildingSkyline className="absolute -bottom-6 -right-16 w-[420px] h-[210px] text-[#1a1a1a]/[0.06] pointer-events-none hidden md:block" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#b70000] font-semibold text-sm uppercase tracking-widest">
            Quiénes somos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mt-2 mb-4">
            Acerca de nosotros
          </h2>
          <p className="text-[#1a1a1a]/60 text-lg max-w-3xl mx-auto leading-relaxed">
            Mobaz es una compañía constructora familiar con sede en Guanacaste, Costa Rica.
            Fundada en 2014, brindamos apoyo integral para el desarrollo de proyectos en las
            distintas ramas de la ingeniería: diseño civil y arquitectónico, diseño eléctrico
            y mecánico, visado de planos, servicios topográficos, presupuestos de obra, y
            construcción y supervisión de proyectos residenciales, comerciales, urbanísticos
            e industriales.
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
            Nuestro equipo
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mt-2 mb-4">
            Conozca a nuestros profesionales
          </h3>
          <p className="text-[#1a1a1a]/60 text-lg max-w-2xl mx-auto">
            El equipo detrás de cada proyecto: ingenieros y arquitectos con años de experiencia
            entregando obras llave en mano.
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
                {member.role}
              </p>
              <p className="text-[#1a1a1a]/50 text-sm mt-2">{member.profession}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
