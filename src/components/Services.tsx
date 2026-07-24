import { PenTool, HardHat, ClipboardList } from "lucide-react";
import { getTranslations } from "next-intl/server";
import BuildingSkyline from "./BuildingSkyline";

export default async function Services() {
  const t = await getTranslations("Services");

  const pillars = [
    {
      icon: PenTool,
      title: t("disenoTitle"),
      description: t("disenoDescription"),
      items: t.raw("disenoItems") as string[],
    },
    {
      icon: HardHat,
      title: t("construccionTitle"),
      description: t("construccionDescription"),
      items: t.raw("construccionItems") as string[],
    },
    {
      icon: ClipboardList,
      title: t("administracionTitle"),
      description: t("administracionDescription"),
      items: t.raw("administracionItems") as string[],
    },
  ];

  return (
    <section id="servicios" className="relative overflow-hidden py-24 bg-[#e6e6e6]">
      <BuildingSkyline flip className="absolute -top-4 -left-16 w-[420px] h-[210px] text-[#1a1a1a]/[0.06] pointer-events-none hidden md:block" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#b70000] font-semibold text-sm uppercase tracking-widest">
            {t("label")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mt-2 mb-4">
            {t("title")}
          </h2>
          <p className="text-[#1a1a1a]/60 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Flexibilidad — el cliente puede traer solo la idea o ya venir con diseño/planos */}
        <div className="mb-14 bg-[#1a1a1a] p-8 md:p-10">
          <div className="text-center mb-8">
            <span className="text-[#ff5a5a] font-semibold text-xs uppercase tracking-widest">
              {t("flexLabel")}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">
              {t("flexTitle")}
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 p-6">
              <h4 className="font-bold text-white text-lg mb-2">{t("flexPath1Title")}</h4>
              <p className="text-white/60 text-sm leading-relaxed">{t("flexPath1Text")}</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6">
              <h4 className="font-bold text-white text-lg mb-2">{t("flexPath2Title")}</h4>
              <p className="text-white/60 text-sm leading-relaxed">{t("flexPath2Text")}</p>
            </div>
          </div>
          <p className="text-center text-white/50 text-sm mt-8">{t("flexFooter")}</p>
        </div>

        {/* Pilares */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white p-8 border border-[#e6e6e6] hover:border-[#b70000] transition-colors duration-300 group flex flex-col"
              >
                <div className="w-14 h-14 bg-[#1a1a1a] group-hover:bg-[#b70000] flex items-center justify-center mb-5 transition-colors duration-300">
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-[#1a1a1a]/60 leading-relaxed mb-6">{pillar.description}</p>
                <ul className="space-y-2.5 mt-auto pt-6 border-t border-[#e6e6e6]">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[#1a1a1a]/80">
                      <span className="w-1.5 h-1.5 bg-[#b70000] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-[#333d73] hover:bg-[#1a1a1a] text-white font-bold px-8 py-4 text-lg transition-colors duration-200"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
