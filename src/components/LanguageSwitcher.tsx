"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const isEs = locale === "es";

  const switchTo = (target: "es" | "en") => {
    if (target !== locale) router.replace(pathname, { locale: target });
  };

  return (
    <div
      role="group"
      aria-label="Cambiar idioma / Change language"
      className={`relative inline-flex items-center h-8 p-0.5 border border-[#1a1a1a]/15 bg-[#f2f2f2] rounded-full select-none text-[#1a1a1a] ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-[#b70000] shadow-sm transition-transform duration-300 ease-out"
        style={{ transform: isEs ? "translateX(0%)" : "translateX(100%)" }}
      />
      <button
        type="button"
        aria-pressed={isEs}
        aria-label="Español"
        onClick={() => switchTo("es")}
        className={`relative z-10 flex-1 min-w-9 px-2.5 text-xs font-bold tracking-wide text-center transition-colors duration-200 ${
          isEs ? "text-white" : "text-[#1a1a1a]/50 hover:text-[#1a1a1a]"
        }`}
      >
        {t("es")}
      </button>
      <button
        type="button"
        aria-pressed={!isEs}
        aria-label="English"
        onClick={() => switchTo("en")}
        className={`relative z-10 flex-1 min-w-9 px-2.5 text-xs font-bold tracking-wide text-center transition-colors duration-200 ${
          !isEs ? "text-white" : "text-[#1a1a1a]/50 hover:text-[#1a1a1a]"
        }`}
      >
        {t("en")}
      </button>
    </div>
  );
}
