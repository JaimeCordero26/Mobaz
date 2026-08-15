"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { MapPin, X, ChevronLeft, ChevronRight, Images, ZoomIn, ZoomOut } from "lucide-react";
import { getClient, type Project } from "@/lib/supabase";
import BuildingSkyline from "./BuildingSkyline";
import Reveal from "./Reveal";

// Las categorías se guardan en español en la base de datos (son las que
// usa el panel admin). Este mapa solo traduce la ETIQUETA visible.
const categoryKeys: Record<string, string> = {
  Todos: "categoryTodos",
  Residencial: "categoryResidencial",
  Comercial: "categoryComercial",
  Apartamentos: "categoryApartamentos",
  Remodelación: "categoryRemodelacion",
};

const demoProjects: Project[] = [
  {
    id: "1",
    name: "Residencial Los Robles",
    location: "San José, Costa Rica",
    description: "Casa residencial de 2 pisos con 4 habitaciones y acabados de lujo.",
    category: "Residencial",
    images: [],
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Edificio Centro Empresarial",
    location: "Escazú, Costa Rica",
    description: "Edificio de 5 pisos para oficinas con parqueo subterráneo.",
    category: "Comercial",
    images: [],
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Condominio Las Palmas",
    location: "Heredia, Costa Rica",
    description: "Complejo de 12 apartamentos con áreas sociales y piscina.",
    category: "Apartamentos",
    images: [],
    created_at: new Date().toISOString(),
  },
];

const categories = ["Todos", "Residencial", "Comercial", "Apartamentos", "Remodelación"];

const categoryColors: Record<string, string> = {
  Residencial: "bg-[#333d73] text-white",
  Comercial: "bg-[#b70000] text-white",
  Apartamentos: "bg-[#1a1a1a] text-white",
  Remodelación: "bg-[#1a1a1a]/70 text-white",
};

// ── Hook: swipe táctil ────────────────────────────────────────────────────────
function useSwipe(onLeft: () => void, onRight: () => void) {
  const touchStartX = useRef<number | null>(null);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) onLeft();   // swipe izquierda → siguiente
      else onRight();           // swipe derecha → anterior
    }
    touchStartX.current = null;
  }

  return { onTouchStart, onTouchEnd };
}

const MAX_ZOOM = 4;
const CLICK_ZOOM = 2.2;

type Pan = { x: number; y: number };

// ── Imagen del lightbox: doble-click / rueda / pinch para zoom, arrastre para pan ──
function ZoomableImage({
  src,
  alt,
  zoom,
  pan,
  onZoomChange,
  onPanChange,
  onSwipeLeft,
  onSwipeRight,
}: {
  src: string;
  alt: string;
  zoom: number;
  pan: Pan;
  onZoomChange: (z: number) => void;
  onPanChange: (p: Pan) => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const draggedRef = useRef(false);
  const zoomRef = useRef(zoom);
  const panRef = useRef(pan);
  zoomRef.current = zoom;
  panRef.current = pan;
  const touchRef = useRef<{
    mode: "pan" | "pinch" | "swipe";
    startX: number;
    startY: number;
    startPanX: number;
    startPanY: number;
    startDist: number;
    startZoom: number;
  } | null>(null);

  function clampPan(z: number, x: number, y: number): Pan {
    const el = imgRef.current;
    const maxX = el ? (el.clientWidth * (z - 1)) / 2 : 0;
    const maxY = el ? (el.clientHeight * (z - 1)) / 2 : 0;
    return { x: Math.min(maxX, Math.max(-maxX, x)), y: Math.min(maxY, Math.max(-maxY, y)) };
  }

  function toggleZoomAt(clientX: number, clientY: number) {
    if (zoom > 1) {
      onZoomChange(1);
      onPanChange({ x: 0, y: 0 });
      return;
    }
    const el = imgRef.current;
    if (!el) { onZoomChange(CLICK_ZOOM); return; }
    const rect = el.getBoundingClientRect();
    const offsetX = clientX - (rect.left + rect.width / 2);
    const offsetY = clientY - (rect.top + rect.height / 2);
    onZoomChange(CLICK_ZOOM);
    onPanChange(clampPan(CLICK_ZOOM, -offsetX * (CLICK_ZOOM - 1), -offsetY * (CLICK_ZOOM - 1)));
  }

  // Listener nativo (no pasivo): React adjunta onWheel como pasivo y no permite
  // preventDefault, necesario acá para que la página no haga scroll al hacer zoom.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const z = zoomRef.current;
      const p = panRef.current;
      const nextZoom = Math.min(MAX_ZOOM, Math.max(1, z - e.deltaY * 0.0018 * z));
      if (nextZoom === z) return;
      if (nextZoom <= 1.02) {
        onZoomChange(1);
        onPanChange({ x: 0, y: 0 });
        return;
      }
      const imgEl = imgRef.current;
      if (imgEl) {
        const rect = imgEl.getBoundingClientRect();
        const offsetX = e.clientX - (rect.left + rect.width / 2);
        const offsetY = e.clientY - (rect.top + rect.height / 2);
        const ratio = nextZoom / z;
        onPanChange(clampPan(nextZoom, p.x * ratio - offsetX * (ratio - 1), p.y * ratio - offsetY * (ratio - 1)));
      }
      onZoomChange(nextZoom);
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onZoomChange, onPanChange]);

  function handleMouseDown(e: React.MouseEvent) {
    if (zoom <= 1) return;
    dragRef.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    draggedRef.current = false;
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) draggedRef.current = true;
    onPanChange(clampPan(zoom, dragRef.current.panX + dx, dragRef.current.panY + dy));
  }

  function handleMouseUp() {
    dragRef.current = null;
  }

  function handleClick() {
    if (draggedRef.current) { draggedRef.current = false; }
  }

  function touchDist(t0: React.Touch, t1: React.Touch) {
    return Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
  }

  function handleTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      touchRef.current = {
        mode: "pinch",
        startX: 0,
        startY: 0,
        startPanX: pan.x,
        startPanY: pan.y,
        startDist: touchDist(e.touches[0], e.touches[1]),
        startZoom: zoom,
      };
    } else if (e.touches.length === 1) {
      touchRef.current = {
        mode: zoom > 1 ? "pan" : "swipe",
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        startPanX: pan.x,
        startPanY: pan.y,
        startDist: 0,
        startZoom: zoom,
      };
    }
  }

  function handleTouchMove(e: React.TouchEvent) {
    const t = touchRef.current;
    if (!t) return;
    if (t.mode === "pinch" && e.touches.length === 2) {
      const newDist = touchDist(e.touches[0], e.touches[1]);
      const nextZoom = Math.min(MAX_ZOOM, Math.max(1, t.startZoom * (newDist / t.startDist)));
      onZoomChange(nextZoom);
      onPanChange(clampPan(nextZoom, t.startPanX, t.startPanY));
    } else if (t.mode === "pan" && e.touches.length === 1) {
      const dx = e.touches[0].clientX - t.startX;
      const dy = e.touches[0].clientY - t.startY;
      onPanChange(clampPan(zoom, t.startPanX + dx, t.startPanY + dy));
    }
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const t = touchRef.current;
    touchRef.current = null;
    if (!t) return;
    if (t.mode === "pinch") {
      if (zoom <= 1.05) { onZoomChange(1); onPanChange({ x: 0, y: 0 }); }
      return;
    }
    if (t.mode === "swipe") {
      const diff = t.startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) onSwipeLeft?.();
        else onSwipeRight?.();
      }
    }
  }

  return (
    <div
      ref={wrapperRef}
      className="w-full h-full overflow-hidden touch-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        onClick={handleClick}
        onDoubleClick={(e) => toggleZoomAt(e.clientX, e.clientY)}
        className={`w-full h-full object-contain ${zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transition: dragRef.current ? "none" : "transform 0.15s ease-out",
        }}
      />
    </div>
  );
}

// ── Card con carrusel y swipe ─────────────────────────────────────────────────
function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project, startIndex: number) => void;
}) {
  const t = useTranslations("Portfolio");
  const [idx, setIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const images = project.images || [];

  const goNext = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length]);
  const goPrev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length]);

  const swipe = useSwipe(goNext, goPrev);

  function prev(e: React.MouseEvent) {
    e.stopPropagation();
    goPrev();
  }

  function next(e: React.MouseEvent) {
    e.stopPropagation();
    goNext();
  }

  return (
    <div
      className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white"
      style={{
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project, idx)}
    >
      {/* Image area */}
      <div
        className="relative h-72 bg-[#e6e6e6] overflow-hidden"
        {...(images.length > 1 ? swipe : {})}
      >
        {images.length > 0 ? (
          <>
            {images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={project.name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                style={{
                  opacity: i === idx ? 1 : 0,
                  transform: i === idx ? (hovered ? "scale(1.07)" : "scale(1)") : "scale(1)",
                  transitionProperty: "opacity, transform",
                }}
              />
            ))}

            {images.length > 1 && (
              <>
                {/* Flechas — visibles siempre en móvil, en hover en desktop */}
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full p-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 z-10"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full p-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 z-10"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                      className={`rounded-full transition-all duration-300 ${i === idx ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"}`}
                    />
                  ))}
                </div>

                {/* Counter */}
                <div className="absolute top-3 right-3 bg-black/50 text-white text-xs rounded-full px-2 py-0.5 flex items-center gap-1 z-10">
                  <Images size={11} />
                  {idx + 1}/{images.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-400 text-sm">{t("noImage")}</span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[project.category] || "bg-gray-100 text-gray-600"}`}>
            {categoryKeys[project.category] ? t(categoryKeys[project.category] as never) : project.category}
          </span>
        </div>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-[#b70000] transition-colors duration-200">
          {project.name}
        </h3>
        <div className="flex items-center gap-1 text-gray-400 text-sm mb-2">
          <MapPin size={13} />
          <span>{project.location}</span>
        </div>
        <p className="text-gray-500 text-sm line-clamp-2">{project.description}</p>
        <div className="mt-3 text-xs text-[#b70000] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {t("viewDetails")}
        </div>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function Portfolio() {
  const t = useTranslations("Portfolio");
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState<Pan>({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [imageIndex, selectedProject]);

  const toggleZoom = useCallback(() => {
    setZoom((z) => {
      if (z > 1) { setPan({ x: 0, y: 0 }); return 1; }
      return CLICK_ZOOM;
    });
  }, []);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const client = getClient();
        if (!client) { setProjects(demoProjects); return; }
        const { data, error } = await client
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });
        if (error || !data || data.length === 0) {
          setProjects(demoProjects);
        } else {
          setProjects(data);
        }
      } catch {
        setProjects(demoProjects);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filtered = activeCategory === "Todos"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  function openModal(project: Project, startIndex = 0) {
    setSelectedProject(project);
    setImageIndex(startIndex);
  }

  const closeModal = useCallback(() => setSelectedProject(null), []);

  const prevImage = useCallback(() => {
    if (!selectedProject) return;
    setImageIndex((i) => (i - 1 + selectedProject.images.length) % selectedProject.images.length);
  }, [selectedProject]);

  const nextImage = useCallback(() => {
    if (!selectedProject) return;
    setImageIndex((i) => (i + 1) % selectedProject.images.length);
  }, [selectedProject]);

  // Teclado en el modal
  useEffect(() => {
    if (!selectedProject) return;
    function onKey(e: KeyboardEvent) {
      if (zoom > 1) {
        if (e.key === "Escape") { setZoom(1); setPan({ x: 0, y: 0 }); }
        return;
      }
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") closeModal();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedProject, prevImage, nextImage, closeModal, zoom]);

  return (
    <section id="portafolio" className="relative overflow-hidden py-24" style={{ background: "#ffffff" }}>
      <BuildingSkyline className="absolute -bottom-6 -right-16 w-[420px] h-[210px] text-[#333d73]/[0.07] pointer-events-none hidden md:block" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="text-center mb-12">
          <span className="text-[#b70000] font-semibold text-sm uppercase tracking-widest">
            {t("label")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </Reveal>

        {/* Category filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#1a1a1a] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t(categoryKeys[cat] as never)}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-72" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">{t("noProjects")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <Reveal key={project.id} delay={(i % 3) * 90}>
                <ProjectCard project={project} onOpen={openModal} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox modal ── */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/90 sm:bg-black/85 z-50 flex items-center justify-center sm:p-6"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full h-full sm:h-[85vh] sm:max-h-[90vh] sm:max-w-6xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Carousel con zoom y swipe */}
            <div className="relative bg-gray-950 flex-1 min-h-0 select-none">
              {selectedProject.images?.length > 0 ? (
                <ZoomableImage
                  key={imageIndex}
                  src={selectedProject.images[imageIndex]}
                  alt={selectedProject.name}
                  zoom={zoom}
                  pan={pan}
                  onZoomChange={setZoom}
                  onPanChange={setPan}
                  onSwipeLeft={selectedProject.images.length > 1 ? nextImage : undefined}
                  onSwipeRight={selectedProject.images.length > 1 ? prevImage : undefined}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white/30">{t("noImage")}</div>
              )}

              {selectedProject.images?.length > 1 && zoom === 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2.5 transition-colors"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2.5 transition-colors"
                  >
                    <ChevronRight size={22} />
                  </button>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedProject.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImageIndex(i)}
                        className={`rounded-full transition-all duration-300 ${i === imageIndex ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/40"}`}
                      />
                    ))}
                  </div>

                  {/* Hint de swipe — solo en móvil, desaparece tras 2s */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 sm:hidden">
                    <span className="text-white/40 text-xs">{t("swipeHint")}</span>
                  </div>
                </>
              )}

              {selectedProject.images?.length > 1 && (
                <div className="absolute top-3 right-24 bg-black/50 text-white text-xs rounded-full px-2.5 py-1">
                  {imageIndex + 1} / {selectedProject.images.length}
                </div>
              )}

              {selectedProject.images?.length > 0 && (
                <button
                  onClick={toggleZoom}
                  aria-label={zoom > 1 ? t("zoomOut") : t("zoomIn")}
                  className="absolute top-3 right-14 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
                >
                  {zoom > 1 ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
                </button>
              )}

              <button
                onClick={closeModal}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Thumbnails */}
            {selectedProject.images?.length > 1 && (
              <div className="flex-shrink-0 flex gap-2 px-4 py-3 bg-gray-50 overflow-x-auto">
                {selectedProject.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setImageIndex(i)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      i === imageIndex ? "border-[#b70000] opacity-100" : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Details */}
            <div className="flex-shrink-0 max-h-[30vh] sm:max-h-[35vh] overflow-y-auto p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{selectedProject.name}</h3>
                  <div className="flex items-center gap-1 text-gray-500 mt-1">
                    <MapPin size={14} />
                    <span className="text-sm">{selectedProject.location}</span>
                  </div>
                </div>
                <span className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap ${categoryColors[selectedProject.category] || "bg-gray-100 text-gray-600"}`}>
                  {categoryKeys[selectedProject.category] ? t(categoryKeys[selectedProject.category] as never) : selectedProject.category}
                </span>
              </div>
              <p className="text-gray-600 mt-3 leading-relaxed text-sm sm:text-base">{selectedProject.description}</p>
              <a
                href="#contacto"
                onClick={closeModal}
                className="mt-5 inline-block bg-[#b70000] hover:bg-[#960000] text-white font-semibold px-6 py-3 transition-colors text-sm"
              >
                {t("quoteSimilar")}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
