"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MapPin, X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { getClient, type Project } from "@/lib/supabase";
import BuildingSkyline from "./BuildingSkyline";

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

// ── Card con carrusel y swipe ─────────────────────────────────────────────────
function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project, startIndex: number) => void;
}) {
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
        className="relative h-56 sm:h-60 bg-[#e6e6e6] overflow-hidden"
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
            <span className="text-gray-400 text-sm">Sin imagen</span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[project.category] || "bg-gray-100 text-gray-600"}`}>
            {project.category}
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
          Ver detalles →
        </div>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

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

  // Swipe en el modal
  const modalSwipe = useSwipe(nextImage, prevImage);

  // Teclado en el modal
  useEffect(() => {
    if (!selectedProject) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") closeModal();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedProject, prevImage, nextImage, closeModal]);

  return (
    <section id="portafolio" className="relative overflow-hidden py-24" style={{ background: "#ffffff" }}>
      <BuildingSkyline className="absolute -bottom-6 -right-16 w-[420px] h-[210px] text-[#333d73]/[0.07] pointer-events-none hidden md:block" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#b70000] font-semibold text-sm uppercase tracking-widest">
            Nuestro trabajo
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Portafolio de Proyectos
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Cada proyecto refleja nuestro compromiso con la calidad, la puntualidad y la satisfacción del cliente.
          </p>
        </div>

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
              {cat}
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
          <p className="text-center text-gray-400 mt-10">No hay proyectos en esta categoría aún.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={openModal} />
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox modal ── */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-3 sm:p-6"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Carousel con swipe */}
            <div
              className="relative bg-gray-950 h-64 sm:h-[26rem] select-none"
              {...(selectedProject.images?.length > 1 ? modalSwipe : {})}
            >
              {selectedProject.images?.length > 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={imageIndex}
                  src={selectedProject.images[imageIndex]}
                  alt={selectedProject.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white/30">Sin imagen</div>
              )}

              {selectedProject.images?.length > 1 && (
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

                  <div className="absolute top-3 right-12 bg-black/50 text-white text-xs rounded-full px-2.5 py-1">
                    {imageIndex + 1} / {selectedProject.images.length}
                  </div>

                  {/* Hint de swipe — solo en móvil, desaparece tras 2s */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 sm:hidden">
                    <span className="text-white/40 text-xs">← deslizá para cambiar →</span>
                  </div>
                </>
              )}

              <button
                onClick={closeModal}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/80 text-white rounded-full p-1.5 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Thumbnails */}
            {selectedProject.images?.length > 1 && (
              <div className="flex gap-2 px-4 py-3 bg-gray-50 overflow-x-auto">
                {selectedProject.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setImageIndex(i)}
                    className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
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
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{selectedProject.name}</h3>
                  <div className="flex items-center gap-1 text-gray-500 mt-1">
                    <MapPin size={14} />
                    <span className="text-sm">{selectedProject.location}</span>
                  </div>
                </div>
                <span className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap ${categoryColors[selectedProject.category] || "bg-gray-100 text-gray-600"}`}>
                  {selectedProject.category}
                </span>
              </div>
              <p className="text-gray-600 mt-3 leading-relaxed text-sm sm:text-base">{selectedProject.description}</p>
              <a
                href="#contacto"
                onClick={closeModal}
                className="mt-5 inline-block bg-[#b70000] hover:bg-[#960000] text-white font-semibold px-6 py-3 transition-colors text-sm"
              >
                Cotizar proyecto similar
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
