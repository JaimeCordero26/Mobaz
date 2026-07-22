import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  // No detectar el idioma por el header Accept-Language del navegador —
  // el sitio arranca siempre en español, inglés es una elección explícita
  // vía el selector (persiste después en una cookie).
  localeDetection: false,
});
