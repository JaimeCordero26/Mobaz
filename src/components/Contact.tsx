"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle, MapPin, Clock, Send } from "lucide-react";
import BuildingSkyline from "./BuildingSkyline";

const CONTACTS = [
  { name: "Jason Mora", phone: "83276566" },
  { name: "Bryan Mora", phone: "83425820" },
];

function waNumber(phone: string) {
  return `506${phone}`;
}

function formatPhone(phone: string) {
  return `${phone.slice(0, 4)}-${phone.slice(4)}`;
}

export default function Contact() {
  const t = useTranslations("Contact");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
    recipient: "",
  });

  const services = t.raw("services") as string[];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const contact = CONTACTS.find((c) => c.name === form.recipient) || CONTACTS[0];
    const msg = `${t("whatsappGreeting")} 👋\n\n*${t("whatsappName")}:* ${form.name}\n*${t("whatsappPhone")}:* ${form.phone}\n*${t("whatsappEmail")}:* ${form.email}\n*${t("whatsappService")}:* ${form.service}\n*${t("whatsappMessage")}:* ${form.message}`;
    const url = `https://wa.me/${waNumber(contact.phone)}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  const isValid = form.name && form.phone && form.service && form.message && form.recipient;

  return (
    <section id="contacto" className="relative overflow-hidden py-24 bg-white">
      <BuildingSkyline flip className="absolute -top-6 -left-16 w-[420px] h-[210px] text-[#b70000]/[0.06] pointer-events-none hidden md:block" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#b70000] font-semibold text-sm uppercase tracking-widest">
            {t("label")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{t("infoTitle")}</h3>
              <div className="space-y-5">
                {CONTACTS.map((contact) => (
                  <a
                    key={contact.name}
                    href={`https://wa.me/${waNumber(contact.phone)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#e6e6e6] rounded-xl flex items-center justify-center group-hover:bg-[#b70000]/10 transition-colors">
                      <MessageCircle size={20} className="text-[#b70000]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-medium">{contact.name}</div>
                      <div className="font-semibold text-gray-900">{formatPhone(contact.phone)}</div>
                    </div>
                  </a>
                ))}

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#e6e6e6] rounded-xl flex items-center justify-center">
                    <MapPin size={20} className="text-[#333d73]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium">{t("ubicacionLabel")}</div>
                    <div className="font-semibold text-gray-900">{t("ubicacionValue")}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#e6e6e6] rounded-xl flex items-center justify-center">
                    <Clock size={20} className="text-[#b70000]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium">{t("horarioLabel")}</div>
                    <div className="font-semibold text-gray-900">{t("horarioValue")}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp directo — uno por contacto */}
            <div className="space-y-3">
              {CONTACTS.map((contact) => (
                <a
                  key={contact.name}
                  href={`https://wa.me/${waNumber(contact.phone)}?text=${encodeURIComponent(t("whatsappDirectGreeting"))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#b70000] hover:bg-[#960000] text-white font-bold px-6 py-4 w-full transition-colors duration-200"
                >
                  <MessageCircle size={22} />
                  {t("chatWith", { name: contact.name })}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{t("formTitle")}</h3>
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("nombreLabel")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder={t("nombrePlaceholder")}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#333d73] focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("telefonoLabel")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder={t("telefonoPlaceholder")}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#333d73] focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("correoLabel")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t("correoPlaceholder")}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#333d73] focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("servicioLabel")}
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#333d73] focus:border-transparent transition bg-white"
                  >
                    <option value="">{t("servicioPlaceholder")}</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("recipientLabel")}
                  </label>
                  <select
                    name="recipient"
                    value={form.recipient}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#333d73] focus:border-transparent transition bg-white"
                  >
                    <option value="">{t("recipientPlaceholder")}</option>
                    {CONTACTS.map((c) => (
                      <option key={c.name} value={c.name}>{c.name} — {formatPhone(c.phone)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("descripcionLabel")}
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder={t("descripcionPlaceholder")}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#333d73] focus:border-transparent transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isValid}
                  className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#b70000] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-4 transition-colors duration-200"
                >
                  <Send size={18} />
                  {t("submit")}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  {t("submitNote")}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
