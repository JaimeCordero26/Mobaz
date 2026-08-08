"use client";

import { useEffect, useRef, useState } from "react";

/* Base público de R2. Si no está seteado, cae a los archivos locales /public.
   Setear NEXT_PUBLIC_MEDIA_URL = https://<tu-dominio-r2-publico> (sin slash final). */
const MEDIA_BASE = (process.env.NEXT_PUBLIC_MEDIA_URL || "").replace(/\/$/, "");

function mediaUrl(key: string): string {
  const k = key.replace(/^\//, "");
  return MEDIA_BASE ? `${MEDIA_BASE}/${k}` : `/${k}`;
}

/* La red decide la calidad. Conexión lenta o modo ahorro → 720.
   Sin Network Information API (Safari/Firefox) → alta calidad por defecto. */
type NavConn = {
  saveData?: boolean;
  effectiveType?: string;
  downlink?: number;
};

function pickLowQuality(): boolean {
  if (typeof navigator === "undefined") return false;
  const c = (navigator as unknown as { connection?: NavConn }).connection;
  if (!c) return false;
  if (c.saveData) return true;
  if (c.effectiveType && /(^|\b)(slow-2g|2g|3g)\b/.test(c.effectiveType)) return true;
  if (typeof c.downlink === "number" && c.downlink > 0 && c.downlink < 2) return true;
  return false;
}

type Props = {
  /** Key del video alta calidad en R2 (o ruta local), ej: "hero/hero-video.mp4" */
  hqKey: string;
  /** Key del video 720p en R2, ej: "hero/hero-video-720.mp4" */
  sdKey: string;
  /** Imagen de fondo que carga de inmediato mientras baja el video */
  poster: string;
  className?: string;
  /** Clases de object-position (Tailwind), permite override solo en mobile via sm: */
  objectPositionClassName?: string;
};

export default function AdaptiveVideo({
  hqKey,
  sdKey,
  poster,
  className = "",
  objectPositionClassName = "object-[65%_center]",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  /* Elegir fuente solo en cliente → evita mismatch de hidratación y
     permite leer la velocidad real de la red del visitante. */
  useEffect(() => {
    // Lectura única de la red en cliente al montar (no hay cascada de renders).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSrc(mediaUrl(pickLowQuality() ? sdKey : hqKey));
  }, [hqKey, sdKey]);

  /* Si el video ya estaba en caché, onLoadedData puede no dispararse:
     chequear readyState al montar la fuente. */
  useEffect(() => {
    const v = videoRef.current;
    // Video ya cacheado: onLoadedData no dispara, marcar cargado al montar la fuente.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (v && v.readyState >= 3) setLoaded(true);
  }, [src]);

  // Poster vive en /public (viaja con la app) → carga instantánea, sin R2.
  const posterUrl = poster.startsWith("http") ? poster : `/${poster.replace(/^\//, "")}`;

  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      {/* Imagen de fondo — carga instantánea, la página nunca espera al video */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={posterUrl}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover ${objectPositionClassName}`}
        />

      {/* Video — arranca invisible, hace fade (shade) al terminar de cargar */}
      {src && (
        <video
          ref={videoRef}
          src={src}
          poster={posterUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setLoaded(true)}
          onCanPlay={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${objectPositionClassName} ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
