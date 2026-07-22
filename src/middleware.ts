import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // No tocar /admin ni /api — el panel de administración no está localizado.
  matcher: ["/((?!admin|api|_next|.*\\..*).*)"],
};
