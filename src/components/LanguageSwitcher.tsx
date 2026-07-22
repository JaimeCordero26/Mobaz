"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const other = locale === "es" ? "en" : "es";

  return (
    <button
      onClick={() => router.replace(pathname, { locale: other })}
      className={`inline-flex items-center gap-1.5 border border-[#1a1a1a]/15 hover:border-[#b70000] px-3 py-1.5 text-sm font-semibold tracking-wide transition-colors duration-200 ${className}`}
      aria-label={`Switch to ${other === "es" ? "Spanish" : "English"}`}
    >
      <Globe size={16} />
      {t(other)}
    </button>
  );
}
