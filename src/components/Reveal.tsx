"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Reveal — envuelve contenido y lo hace aparecer al entrar en viewport.
 * IntersectionObserver puro, sin dependencias. Respeta prefers-reduced-motion
 * vía CSS ([data-reveal] en globals.css). Motivación: jerarquía + storytelling.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className,
  once = true,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            entry.target.setAttribute("data-revealed", "false");
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
}
