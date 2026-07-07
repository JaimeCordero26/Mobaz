"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getClient } from "@/lib/supabase";
import { Lock, CheckCircle, AlertCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [ready, setReady] = useState(false);

  // Supabase maneja el token del link automáticamente en la sesión
  useEffect(() => {
    const client = getClient();
    if (!client) return;
    // Escuchar cuando Supabase procesa el token del link
    const { data: { subscription } } = client.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    if (password !== confirm) { setErrorMsg("Las contraseñas no coinciden."); return; }
    if (password.length < 8) { setErrorMsg("La contraseña debe tener al menos 8 caracteres."); return; }

    setStatus("loading");
    const client = getClient();
    if (!client) { setStatus("error"); setErrorMsg("Error de configuración."); return; }

    const { error } = await client.auth.updateUser({ password });
    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("success");
      setTimeout(() => router.push("/admin"), 2500);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #1a5276 40%, #1e8449 100%)" }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/api/logo" alt="Logo" className="h-14 w-auto mx-auto mb-4 object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <h1 className="text-2xl font-bold text-white">Mobaz</h1>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          {status === "success" ? (
            <div className="text-center">
              <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-green-400" />
              </div>
              <h2 className="text-lg font-bold text-white mb-2">Contraseña actualizada</h2>
              <p className="text-white/60 text-sm">Redirigiendo al panel...</p>
            </div>
          ) : !ready ? (
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4" />
              <p className="text-white/60 text-sm">Verificando link...</p>
              <p className="text-white/40 text-xs mt-2">Si esto tarda mucho, el link puede haber expirado.</p>
              <button onClick={() => router.push("/admin")} className="mt-4 text-white/50 hover:text-white text-sm underline transition-colors">
                Volver al login
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-white mb-2">Nueva contraseña</h2>
              <p className="text-white/50 text-xs mb-6">Elegí una contraseña segura de al menos 8 caracteres.</p>

              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wide">Nueva contraseña</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 8 caracteres" required
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wide">Confirmar contraseña</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                    <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repetí la contraseña" required
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm" />
                  </div>
                </div>

                {(errorMsg || status === "error") && (
                  <div className="bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-2.5 text-red-200 text-sm flex items-center gap-2">
                    <AlertCircle size={15} /> {errorMsg || "Ocurrió un error. Intentá de nuevo."}
                  </div>
                )}

                <button type="submit" disabled={status === "loading"}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-800 text-white font-bold py-3 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2">
                  {status === "loading" ? (
                    <><span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Guardando...</>
                  ) : "Guardar nueva contraseña"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
