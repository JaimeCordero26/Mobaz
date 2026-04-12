"use client";

import { useState } from "react";
import { Phone, MessageCircle, MapPin, Clock, Send } from "lucide-react";

const WHATSAPP_NUMBER = "50688035690";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const services = [
    "Casa residencial",
    "Edificio / Apartamentos",
    "Remodelación",
    "Acabados",
    "Construcción comercial",
    "Mantenimiento / Arreglos",
    "Otro",
  ];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = `Hola SC Servicios Constructivos! 👋\n\n*Nombre:* ${form.name}\n*Teléfono:* ${form.phone}\n*Email:* ${form.email}\n*Servicio:* ${form.service}\n*Mensaje:* ${form.message}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  const isValid = form.name && form.phone && form.service && form.message;

  return (
    <section id="contacto" className="py-24" style={{ background: "linear-gradient(160deg, #e8f5f0 0%, #f0f4ff 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">
            Hablemos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Contáctanos
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            ¿Tenés un proyecto en mente? Escribinos y te damos una cotización gratuita sin compromiso.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Información de contacto</h3>
              <div className="space-y-5">
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Phone size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium">Teléfono</div>
                    <div className="font-semibold text-gray-900">8803-5690</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <MessageCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium">WhatsApp</div>
                    <div className="font-semibold text-gray-900">8803-5690</div>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <MapPin size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium">Ubicación</div>
                    <div className="font-semibold text-gray-900">Costa Rica</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <Clock size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium">Horario</div>
                    <div className="font-semibold text-gray-900">Lun - Sáb: 7am - 6pm</div>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp direct */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola! Me gustaría información sobre sus servicios de construcción.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-4 rounded-2xl w-full transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <MessageCircle size={22} />
              Chatear por WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Enviar consulta</h3>
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre completo"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="8888-8888"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Servicio de interés *
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                  >
                    <option value="">Seleccionar servicio...</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Descripción del proyecto *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Cuéntanos sobre tu proyecto: tamaño, ubicación, materiales que tenés en mente, presupuesto aproximado..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isValid}
                  className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-4 rounded-xl transition-colors duration-200"
                >
                  <Send size={18} />
                  Enviar por WhatsApp
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Al enviar, se abrirá WhatsApp con tu mensaje listo para enviar.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
