"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#b70000", "#333d73", "#1a1a1a"];

type Shape = "square" | "cube";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vr: number;
  shape: Shape;
  color: string;
};

// Cubo isométrico chico — hace eco del ícono del logo (bloque de construcción)
function drawCube(ctx: CanvasRenderingContext2D, size: number) {
  const h = size * 0.55;
  ctx.beginPath();
  // cara superior (rombo)
  ctx.moveTo(0, -h);
  ctx.lineTo(size, -h * 0.4);
  ctx.lineTo(0, size * 0.2);
  ctx.lineTo(-size, -h * 0.4);
  ctx.closePath();
  // arista central
  ctx.moveTo(0, -h);
  ctx.lineTo(0, size * 0.2);
  // caras laterales
  ctx.moveTo(-size, -h * 0.4);
  ctx.lineTo(-size, h * 0.6);
  ctx.lineTo(0, size * 1.2);
  ctx.lineTo(0, size * 0.2);
  ctx.moveTo(size, -h * 0.4);
  ctx.lineTo(size, h * 0.6);
  ctx.lineTo(0, size * 1.2);
  ctx.stroke();
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let animationId: number;

    function resize() {
      const parent = canvas!.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;

      const count = Math.round((width * height) / 26000);
      particles = Array.from({ length: count }, () => {
        const isCube = Math.random() < 0.22;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: isCube ? Math.random() * 5 + 7 : Math.random() * 3 + 2,
          rotation: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.004,
          shape: isCube ? "cube" : "square",
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      });
    }

    function tick() {
      ctx!.clearRect(0, 0, width, height);

      // líneas tipo plano/blueprint entre partículas cercanas
      ctx!.globalAlpha = 0.07;
      ctx!.strokeStyle = "#333d73";
      ctx!.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vr;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.shape === "square" ? p.rotation : 0);
        ctx!.strokeStyle = p.color;
        ctx!.lineWidth = 1;

        if (p.shape === "square") {
          ctx!.globalAlpha = 0.3;
          ctx!.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx!.globalAlpha = 0.22;
          drawCube(ctx!, p.size);
        }

        ctx!.restore();
      }

      animationId = requestAnimationFrame(tick);
    }

    resize();
    tick();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
