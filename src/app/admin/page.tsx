"use client";

import { useState, useEffect } from "react";
import { getClient, type Project } from "@/lib/supabase";
import {
  Plus, Trash2, Upload, LogOut, MapPin, Tag, X, Eye,
  Pencil, ChevronLeft, ChevronRight, FolderOpen, ImageIcon,
  Mail, Lock, ArrowLeft, CheckCircle,
} from "lucide-react";

const categories = ["Residencial", "Comercial", "Apartamentos", "Remodelación"];

const catColors: Record<string, string> = {
  Residencial: "bg-blue-100 text-blue-700",
  Comercial: "bg-green-100 text-green-700",
  Apartamentos: "bg-purple-100 text-purple-700",
  Remodelación: "bg-orange-100 text-orange-700",
};

type Screen = "loading" | "setup" | "login" | "forgot" | "forgot-sent" | "panel";

type FormState = {
  name: string;
  location: string;
  description: string;
  category: string;
  existingImages: string[];
};

const emptyForm: FormState = {
  name: "", location: "", description: "", category: "Residencial", existingImages: [],
};

// ── Auth screens ──────────────────────────────────────────────────────────────

function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #1a5276 40%, #1e8449 100%)" }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/api/logo"
            alt="Logo"
            className="h-16 w-auto mx-auto mb-4 object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <h1 className="text-2xl font-bold text-white">Mobaz</h1>
          <p className="text-white/50 text-sm mt-1">Panel de administración</p>
        </div>
        {children}
      </div>
    </div>
  );
}

function InputField({
  label, type, value, onChange, placeholder, icon: Icon,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
}) {
  return (
    <div>
      <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wide">{label}</label>
      <div className="relative">
        <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required
          className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm"
        />
      </div>
    </div>
  );
}

// ── Setup screen (primera vez) ─────────────────────────────────────────────────
function SetupScreen({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSetup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Las contraseñas no coinciden."); return; }
    if (password.length < 8) { setError("La contraseña debe tener al menos 8 caracteres."); return; }
    setLoading(true);
    const client = getClient();
    if (!client) { setError("Error de configuración. Revisá el .env.local."); setLoading(false); return; }

    const { error: signUpError } = await client.auth.signUp({ email, password });
    if (signUpError) { setError(signUpError.message); setLoading(false); return; }

    // Marcar setup como completo
    await client.from("admin_settings").update({ setup_complete: true }).eq("id", 1);
    onDone();
  }

  return (
    <AuthShell>
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-300 text-xs font-semibold uppercase tracking-wide">Primera configuración</span>
        </div>
        <h2 className="text-lg font-bold text-white mb-1">Crear cuenta de administrador</h2>
        <p className="text-white/50 text-xs mb-6">Esta pantalla solo aparece una vez. Guardá bien tus datos.</p>

        <form onSubmit={handleSetup} className="space-y-4">
          <InputField label="Correo electrónico" type="email" value={email} onChange={setEmail} placeholder="admin@ejemplo.com" icon={Mail} />
          <InputField label="Contraseña" type="password" value={password} onChange={setPassword} placeholder="Mínimo 8 caracteres" icon={Lock} />
          <InputField label="Confirmar contraseña" type="password" value={confirm} onChange={setConfirm} placeholder="Repetí la contraseña" icon={Lock} />

          {error && (
            <div className="bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-2.5 text-red-200 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-800 text-white font-bold py-3 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <><span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Creando cuenta...</>
            ) : "Crear cuenta"}
          </button>
        </form>
      </div>
    </AuthShell>
  );
}

// ── Login screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin, onForgot, onReset }: { onLogin: () => void; onForgot: () => void; onReset: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [resetting, setResetting] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const client = getClient();
    if (!client) { setError("Error de configuración."); setLoading(false); return; }

    const { error: authError } = await client.auth.signInWithPassword({ email, password });
    if (authError) {
      setFailCount((n) => n + 1);
      setError("Correo o contraseña incorrectos.");
      setLoading(false);
      return;
    }
    onLogin();
  }

  async function handleResetSetup() {
    if (!confirm("¿Seguro? Esto borrará la cuenta actual y te permitirá crear una nueva.")) return;
    setResetting(true);
    const client = getClient();
    if (client) await client.from("admin_settings").update({ setup_complete: false }).eq("id", 1);
    setResetting(false);
    onReset();
  }

  return (
    <AuthShell>
      <form onSubmit={handleLogin} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-lg font-semibold text-white mb-6">Iniciar sesión</h2>
        <div className="space-y-4">
          <InputField label="Correo electrónico" type="email" value={email} onChange={setEmail} placeholder="admin@ejemplo.com" icon={Mail} />
          <InputField label="Contraseña" type="password" value={password} onChange={setPassword} placeholder="••••••••" icon={Lock} />

          {error && (
            <div className="bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-2.5 text-red-200 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-800 text-white font-bold py-3 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Ingresando...</>
            ) : "Ingresar"}
          </button>

          <button
            type="button"
            onClick={onForgot}
            className="w-full text-white/50 hover:text-white/80 text-sm transition-colors text-center pt-1"
          >
            ¿Olvidaste tu contraseña?
          </button>

          {/* Aparece después de 2 intentos fallidos — para cuando se eliminó el usuario */}
          {failCount >= 2 && (
            <div className="border-t border-white/10 pt-4 mt-2">
              <p className="text-white/40 text-xs text-center mb-2">
                ¿Eliminaste el usuario desde Supabase?
              </p>
              <button
                type="button"
                onClick={handleResetSetup}
                disabled={resetting}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/70 hover:text-white text-sm font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {resetting
                  ? <><span className="animate-spin inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full" /> Reiniciando...</>
                  : "Crear cuenta nueva"}
              </button>
            </div>
          )}
        </div>
      </form>
    </AuthShell>
  );
}

// ── Forgot password screen ────────────────────────────────────────────────────
function ForgotScreen({ onBack, onSent }: { onBack: () => void; onSent: () => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const client = getClient();
    if (!client) { setError("Error de configuración."); setLoading(false); return; }

    const { error: resetError } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset`,
    });

    if (resetError) { setError(resetError.message); setLoading(false); return; }
    onSent();
  }

  return (
    <AuthShell>
      <form onSubmit={handleReset} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
        <button type="button" onClick={onBack} className="flex items-center gap-1.5 text-white/50 hover:text-white/80 text-sm mb-5 transition-colors">
          <ArrowLeft size={14} /> Volver
        </button>
        <h2 className="text-lg font-semibold text-white mb-2">Recuperar contraseña</h2>
        <p className="text-white/50 text-xs mb-6">Te enviamos un link al correo para crear una nueva contraseña.</p>

        <div className="space-y-4">
          <InputField label="Correo electrónico" type="email" value={email} onChange={setEmail} placeholder="admin@ejemplo.com" icon={Mail} />

          {error && (
            <div className="bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-2.5 text-red-200 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-800 text-white font-bold py-3 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Enviando...</>
            ) : "Enviar link de recuperación"}
          </button>
        </div>
      </form>
    </AuthShell>
  );
}

// ── Email sent confirmation ───────────────────────────────────────────────────
function ForgotSentScreen({ onBack }: { onBack: () => void }) {
  return (
    <AuthShell>
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl text-center">
        <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={28} className="text-green-400" />
        </div>
        <h2 className="text-lg font-bold text-white mb-2">Correo enviado</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          Revisá tu bandeja de entrada. El link para cambiar tu contraseña llega en unos segundos.
          Si no lo ves, revisá la carpeta de spam.
        </p>
        <button
          onClick={onBack}
          className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
        >
          Volver al login
        </button>
      </div>
    </AuthShell>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [screen, setScreen] = useState<Screen>("loading");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  const [mode, setMode] = useState<"create" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // ── Init: check session & setup status ──
  useEffect(() => {
    async function init() {
      const client = getClient();
      if (!client) { setScreen("login"); return; }

      // Check active session first
      const { data: { session } } = await client.auth.getSession();
      if (session) { setScreen("panel"); return; }

      // No session — check if setup was done
      const { data } = await client.from("admin_settings").select("setup_complete").eq("id", 1).single();
      if (data?.setup_complete) {
        setScreen("login");
      } else {
        setScreen("setup");
      }
    }
    init();
  }, []);

  // ── Listen to auth state changes ──
  useEffect(() => {
    const client = getClient();
    if (!client) return;
    const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
      if (session) setScreen("panel");
      else if (screen === "panel") setScreen("login");
    });
    return () => subscription.unsubscribe();
  }, [screen]);

  // ── Load projects when panel is shown ──
  useEffect(() => {
    if (screen === "panel") loadProjects();
  }, [screen]);

  async function loadProjects() {
    setLoadingProjects(true);
    const client = getClient();
    if (!client) { setLoadingProjects(false); return; }
    const { data } = await client.from("projects").select("*").order("created_at", { ascending: false });
    setProjects(data || []);
    setLoadingProjects(false);
  }

  async function handleSignOut() {
    const client = getClient();
    if (!client) return;
    await client.auth.signOut();
    setScreen("login");
  }

  function openCreate() {
    setForm(emptyForm); setPendingFiles([]); setPreviewUrls([]); setEditingId(null); setMode("create");
    setTimeout(() => document.getElementById("admin-form")?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  function openEdit(project: Project) {
    setForm({ name: project.name, location: project.location, description: project.description, category: project.category, existingImages: project.images || [] });
    setPendingFiles([]); setPreviewUrls([]); setEditingId(project.id); setMode("edit");
    setTimeout(() => document.getElementById("admin-form")?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  function closeForm() {
    setMode(null); setEditingId(null); setForm(emptyForm); setPendingFiles([]); setPreviewUrls([]);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setPendingFiles((p) => [...p, ...files]);
    setPreviewUrls((p) => [...p, ...files.map((f) => URL.createObjectURL(f))]);
  }

  function removePending(i: number) {
    setPendingFiles((p) => p.filter((_, idx) => idx !== i));
    setPreviewUrls((p) => p.filter((_, idx) => idx !== i));
  }

  function removeExisting(url: string) {
    setForm((f) => ({ ...f, existingImages: f.existingImages.filter((u) => u !== url) }));
  }

  async function uploadNewImages(): Promise<string[]> {
    if (pendingFiles.length === 0) return [];
    const urls: string[] = [];
    for (const file of pendingFiles) {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      if (res.ok) {
        const { url } = await res.json();
        urls.push(url);
      }
    }
    return urls;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);
    const client = getClient();
    if (!client) { setUploading(false); return; }
    try {
      const newUrls = await uploadNewImages();
      const allImages = [...form.existingImages, ...newUrls];
      if (mode === "create") {
        await client.from("projects").insert({ name: form.name, location: form.location, description: form.description, category: form.category, images: allImages });
      } else if (mode === "edit" && editingId) {
        await client.from("projects").update({ name: form.name, location: form.location, description: form.description, category: form.category, images: allImages }).eq("id", editingId);
      }
      closeForm();
      await loadProjects();
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este proyecto? Esta acción no se puede deshacer.")) return;
    const client = getClient();
    if (!client) return;
    await client.from("projects").delete().eq("id", id);
    if (editingId === id) closeForm();
    await loadProjects();
  }

  // ── Screen routing ──
  if (screen === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #1a5276 40%, #1e8449 100%)" }}>
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4" />
          <p className="text-white/50 text-sm">Cargando...</p>
        </div>
      </div>
    );
  }

  if (screen === "setup") return <SetupScreen onDone={() => setScreen("panel")} />;
  if (screen === "login") return <LoginScreen onLogin={() => setScreen("panel")} onForgot={() => setScreen("forgot")} onReset={() => setScreen("setup")} />;
  if (screen === "forgot") return <ForgotScreen onBack={() => setScreen("login")} onSent={() => setScreen("forgot-sent")} />;
  if (screen === "forgot-sent") return <ForgotSentScreen onBack={() => setScreen("login")} />;

  // ── Panel ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #f0f4ff 0%, #e8f5f0 100%)" }}>
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/api/logo" alt="Logo" className="h-9 w-auto object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div>
              <span className="font-bold text-gray-900 text-sm">Panel Admin</span>
              <span className="hidden sm:inline text-gray-400 text-xs ml-2">Mobaz</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-blue-700 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all">
              <Eye size={14} /><span className="hidden sm:inline">Ver sitio</span>
            </a>
            <button onClick={handleSignOut} className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-red-600 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all">
              <LogOut size={14} /><span className="hidden sm:inline">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total proyectos", value: projects.length, color: "text-blue-700" },
            { label: "Residencial", value: projects.filter(p => p.category === "Residencial").length, color: "text-blue-600" },
            { label: "Comercial", value: projects.filter(p => p.category === "Comercial").length, color: "text-green-600" },
            { label: "Apartamentos", value: projects.filter(p => p.category === "Apartamentos").length, color: "text-purple-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-white">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FolderOpen size={20} className="text-blue-600" /> Proyectos
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">{projects.length} proyecto(s) en total</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 sm:px-5 py-2.5 rounded-xl transition-colors shadow-md text-sm"
          >
            <Plus size={17} /> Nuevo proyecto
          </button>
        </div>

        {/* Form */}
        {mode && (
          <div id="admin-form" className="bg-white rounded-2xl shadow-md border border-gray-100 mb-8 overflow-hidden">
            <div
              className="px-6 py-4 border-b border-gray-100 flex items-center justify-between"
              style={{ background: mode === "create" ? "linear-gradient(90deg,#1a5276,#1e8449)" : "linear-gradient(90deg,#1e3a5f,#1a5276)" }}
            >
              <div>
                <h3 className="text-base font-bold text-white">{mode === "create" ? "✦ Nuevo proyecto" : "✎ Editando proyecto"}</h3>
                {mode === "edit" && <p className="text-white/60 text-xs mt-0.5">{form.name}</p>}
              </div>
              <button type="button" onClick={closeForm} className="text-white/60 hover:text-white transition-colors"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Nombre del proyecto *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ej: Residencial Los Robles"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5"><MapPin size={11} className="inline mr-1" />Ubicación *</label>
                  <input type="text" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Ej: San José, Costa Rica"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5"><Tag size={11} className="inline mr-1" />Categoría *</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors">
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Descripción *</label>
                  <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Descripción breve del proyecto..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-gray-50 focus:bg-white transition-colors" />
                </div>

                {mode === "edit" && form.existingImages.length > 0 && (
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Fotos actuales ({form.existingImages.length}) — ✕ para quitar</label>
                    <div className="flex flex-wrap gap-3">
                      {form.existingImages.map((url) => (
                        <div key={url} className="relative group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={url} alt="" className="w-20 h-20 object-cover rounded-xl border-2 border-gray-200 group-hover:border-red-300 transition-colors" />
                          <button type="button" onClick={() => removeExisting(url)}
                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                            <X size={11} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    {mode === "edit" ? "Agregar más fotos" : "Fotos del proyecto"}
                  </label>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-xl p-6 cursor-pointer transition-all group bg-gray-50 hover:bg-blue-50">
                    <div className="w-10 h-10 rounded-full bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center mb-2 transition-colors">
                      <Upload size={18} className="text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-600 group-hover:text-blue-700">Clic para subir fotos</span>
                    <span className="text-xs text-gray-400 mt-0.5">JPG, PNG, WEBP, SVG — múltiples archivos</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                  {previewUrls.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-3">
                      {previewUrls.map((url, i) => (
                        <div key={i} className="relative group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={url} alt="" className="w-20 h-20 object-cover rounded-xl border-2 border-green-200" />
                          <button type="button" onClick={() => removePending(i)}
                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                            <X size={11} />
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-green-600 text-white text-center text-[9px] py-0.5 rounded-b-xl font-medium">NUEVA</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-gray-100">
                <button type="submit" disabled={uploading}
                  className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 disabled:bg-gray-300 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-md text-sm">
                  {uploading ? (
                    <><span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Subiendo fotos...</>
                  ) : mode === "create" ? <><Plus size={15} /> Guardar proyecto</> : <><Pencil size={15} /> Guardar cambios</>}
                </button>
                <button type="button" onClick={closeForm} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects grid */}
        {loadingProjects ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="bg-white rounded-2xl animate-pulse h-48 shadow-sm" />)}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FolderOpen size={28} className="text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">No hay proyectos aún</p>
            <p className="text-gray-400 text-sm mt-1">Creá el primero con el botón de arriba.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <div key={project.id}
                className={`bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col ${editingId === project.id ? "border-blue-400 ring-2 ring-blue-100" : "border-gray-100 hover:border-gray-200"}`}>
                <button type="button" onClick={() => { setPreviewProject(project); setCarouselIndex(0); }}
                  className="relative h-44 bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden group flex-shrink-0 w-full">
                  {project.images?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
                      <ImageIcon size={28} /><span className="text-xs">Sin fotos</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 px-3 py-1.5 rounded-full">Ver fotos</span>
                  </div>
                  <div className="absolute top-2.5 left-2.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catColors[project.category] || "bg-gray-100 text-gray-600"}`}>{project.category}</span>
                  </div>
                  {project.images && project.images.length > 0 && (
                    <div className="absolute top-2.5 right-2.5 bg-black/50 text-white text-xs rounded-full px-2 py-0.5 flex items-center gap-1">
                      <ImageIcon size={10} /> {project.images.length}
                    </div>
                  )}
                </button>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm leading-snug">{project.name}</h4>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mt-1"><MapPin size={10} /><span className="truncate">{project.location}</span></div>
                    <p className="text-gray-400 text-xs mt-2 line-clamp-2 leading-relaxed">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-50">
                    <button onClick={() => openEdit(project)}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs text-blue-600 hover:text-white hover:bg-blue-600 font-semibold py-2 rounded-lg transition-all border border-blue-200 hover:border-blue-600">
                      <Pencil size={12} /> Editar
                    </button>
                    <button onClick={() => handleDelete(project.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs text-red-400 hover:text-white hover:bg-red-500 font-semibold py-2 rounded-lg transition-all border border-red-200 hover:border-red-500">
                      <Trash2 size={12} /> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Image preview modal */}
      {previewProject && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setPreviewProject(null)}>
          <div className="relative bg-gray-950 rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-64 sm:h-96">
              {previewProject.images?.[carouselIndex] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewProject.images[carouselIndex]} alt="" className="w-full h-full object-contain" />
              ) : (
                <div className="flex items-center justify-center h-full text-white/30">Sin imagen</div>
              )}
              {previewProject.images && previewProject.images.length > 1 && (
                <>
                  <button onClick={() => setCarouselIndex((i) => (i - 1 + previewProject.images.length) % previewProject.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white rounded-full p-2.5 transition-colors"><ChevronLeft size={20} /></button>
                  <button onClick={() => setCarouselIndex((i) => (i + 1) % previewProject.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white rounded-full p-2.5 transition-colors"><ChevronRight size={20} /></button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {previewProject.images.map((_, i) => (
                      <button key={i} onClick={() => setCarouselIndex(i)} className={`rounded-full transition-all ${i === carouselIndex ? "w-4 h-2 bg-white" : "w-2 h-2 bg-white/40"}`} />
                    ))}
                  </div>
                </>
              )}
              <button onClick={() => setPreviewProject(null)} className="absolute top-3 right-3 bg-black/60 hover:bg-black/90 text-white rounded-full p-1.5 transition-colors"><X size={16} /></button>
            </div>
            <div className="p-4 bg-gray-900">
              <p className="font-bold text-white text-sm">{previewProject.name}</p>
              <p className="text-gray-400 text-xs mt-0.5">{previewProject.images?.length || 0} foto(s) · {previewProject.location}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
