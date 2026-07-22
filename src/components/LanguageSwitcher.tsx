"use client";

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
      className={`font-semibold text-sm tracking-wide ${className}`}
      aria-label={`Switch to ${other === "es" ? "Spanish" : "English"}`}
    >
      {t(other)}
    </button>
  );
}
