"use client";

import { useEffect, useRef } from "react";

const ICONS = [
  { src: "/icons/bosquejo.png", top: "12%", left: "8%", size: 40, rotate: -8, duration: 7 },
  { src: "/icons/plano.png", top: "22%", left: "88%", size: 46, rotate: 6, duration: 8.5 },
  { src: "/icons/plano.png", top: "68%", left: "6%", size: 34, rotate: 10, duration: 6.5 },
  { src: "/icons/bosquejo.png", top: "78%", left: "92%", size: 38, rotate: -5, duration: 9 },
  { src: "/icons/bosquejo.png", top: "45%", left: "94%", size: 28, rotate: 14, duration: 7.5 },
  { src: "/icons/plano.png", top: "8%", left: "48%", size: 30, rotate: -12, duration: 8 },
  { src: "/icons/plano.png", top: "88%", left: "40%", size: 32, rotate: 8, duration: 6.8 },
  { src: "/icons/bosquejo.png", top: "35%", left: "3%", size: 26, rotate: 18, duration: 9.5 },
  { src: "/icons/plano.png", top: "58%", left: "22%", size: 30, rotate: 12, duration: 7.2 },
  { src: "/icons/bosquejo.png", top: "5%", left: "72%", size: 32, rotate: -10, duration: 8.2 },
  { src: "/icons/plano.png", top: "92%", left: "68%", size: 28, rotate: 9, duration: 6.2 },
  { src: "/icons/bosquejo.png", top: "60%", left: "80%", size: 24, rotate: -16, duration: 9.2 },
  { src: "/icons/plano.png", top: "30%", left: "62%", size: 26, rotate: 15, duration: 7.8 },
  { src: "/icons/bosquejo.png", top: "15%", left: "30%", size: 24, rotate: -20, duration: 8.8 },
  { src: "/icons/plano.png", top: "50%", left: "12%", size: 22, rotate: 5, duration: 6.9 },
  { src: "/icons/bosquejo.png", top: "95%", left: "15%", size: 26, rotate: -9, duration: 9.8 },
];

// Puntos chicos conectados por líneas — pocos, de fondo, bien sutiles
function DotNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Dot = { x: number; y: number; vx: number; vy: number };
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let animationId: number;

    function resize() {
      const parent = canvas!.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;

      const count = Math.min(24, Math.round((width * height) / 45000));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      }));
    }

    function tick() {
      ctx!.clearRect(0, 0, width, height);

      ctx!.strokeStyle = "#333d73";
      ctx!.lineWidth = 1;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 160) {
            ctx!.globalAlpha = 0.08 * (1 - dist / 160);
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      ctx!.fillStyle = "#1a1a1a";
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > width) d.vx *= -1;
        if (d.y < 0 || d.y > height) d.vy *= -1;

        ctx!.globalAlpha = 0.18;
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, 2, 0, Math.PI * 2);
        ctx!.fill();
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <DotNetwork />
      {ICONS.map((item, i) => (
        <div
          key={i}
          className="absolute animate-float-particle"
          style={{
            top: item.top,
            left: item.left,
            animationDuration: `${item.duration}s`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt=""
            width={item.size}
            height={item.size}
            style={{
              transform: `rotate(${item.rotate}deg)`,
              opacity: 0.14,
            }}
          />
        </div>
      ))}
    </div>
  );
}
