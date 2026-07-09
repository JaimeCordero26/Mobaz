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

export default function About() {
  return (
    <section id="nosotros" className="relative overflow-hidden py-24 bg-[#e6e6e6]">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>
    </section>
  );
}
