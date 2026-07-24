import { MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { InstagramIcon, FacebookIcon } from "./SocialIcons";

const CONTACTS = [
  { name: "Jason Mora", phone: "83276566" },
  { name: "Bryan Mora", phone: "83425820" },
];

const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com/mobazcr", Icon: InstagramIcon },
  { name: "Facebook", href: "https://www.facebook.com/share/1DsmeCFA4v/?mibextid=wwXIfr", Icon: FacebookIcon },
];

export default async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: "/#inicio", label: tNav("inicio") },
    { href: "/nosotros", label: tNav("quienesSomos") },
    { href: "/#servicios", label: tNav("servicios") },
    { href: "/#portafolio", label: tNav("portafolio") },
    { href: "/#contacto", label: tNav("contacto") },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-white.png" alt="Mobaz" className="h-10 w-auto object-contain mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {t("tagline")}
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-9 h-9 flex items-center justify-center border border-white/15 text-gray-400 hover:text-white hover:border-[#b70000] transition-colors"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-200 mb-4">{t("navTitle")}</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#b70000] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-200 mb-4">{t("contactTitle")}</h4>
            <div className="space-y-3">
              {CONTACTS.map((contact) => (
                <a
                  key={contact.name}
                  href={`https://wa.me/506${contact.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <MessageCircle size={16} className="text-[#b70000]" />
                  {contact.name} — {contact.phone.slice(0, 4)}-{contact.phone.slice(4)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-500 text-sm">
          <span>© {currentYear} Mobaz. {t("rights")}</span>
          <a
            href="https://sacortech.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
          >
            {t("developedBy")}<span className="align-super text-[10px] ml-0.5">™</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
