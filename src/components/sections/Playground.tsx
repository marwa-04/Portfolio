import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Waves } from "lucide-react";
import { SectionHeading } from "./About";
import { GlassCard } from "@/components/ui/GlassCard";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function Playground() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const idRef = useRef(0);

  const spawn = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = ++idRef.current;
    setRipples((r) => [...r, { id, x, y, size: 60 + Math.random() * 80 }]);
    setTimeout(() => setRipples((r) => r.filter((rr) => rr.id !== id)), 1700);
  };

  return (
    <section id="playground" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="08 · Lab"
          title="Experimental Playground"
          subtitle="A small Aero garden — tap, drag, breathe. Pure CSS, SVG and JS love."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Ripple pad */}
          <GlassCard className="relative overflow-hidden p-0">
            <div
              onClick={spawn}
              role="button"
              tabIndex={0}
              data-cursor="hover"
              className="relative h-72 w-full cursor-crosshair select-none"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.55) 0%, rgba(180,238,255,0.35) 35%, rgba(76,214,255,0.4) 75%, rgba(8,98,138,0.55) 110%)",
              }}
            >
              {/* Ambient waves */}
              <motion.div
                aria-hidden
                className="absolute inset-0 opacity-50 mix-blend-overlay"
                style={{
                  background:
                    "repeating-radial-gradient(circle at 50% 70%, rgba(255,255,255,0.2) 0 6px, transparent 6px 22px)",
                }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="absolute inset-x-0 top-3 flex items-center justify-between px-4 text-[10px] uppercase tracking-[0.3em] text-white/90">
                <span className="inline-flex items-center gap-1.5"><Droplets size={12} /> ripple pad</span>
                <span>tap the water</span>
              </div>

              {ripples.map((r) => (
                <span
                  key={r.id}
                  className="pointer-events-none absolute rounded-full border-2 border-white/80 animate-ripple"
                  style={{
                    left: r.x - r.size / 2,
                    top: r.y - r.size / 2,
                    width: r.size,
                    height: r.size,
                    boxShadow:
                      "0 0 22px rgba(255,255,255,0.7), inset 0 0 18px rgba(255,255,255,0.6)",
                  }}
                />
              ))}

              {/* Sticker fish */}
              <motion.div
                animate={{ x: [0, 280, 0], y: [0, -10, 6, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 left-4 text-2xl"
                aria-hidden
              >
                🐟
              </motion.div>
            </div>
          </GlassCard>

          {/* Magnet field */}
          <MagnetField />
        </div>
      </div>
    </section>
  );
}

function MagnetField() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    const leave = () => setPos(null);
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  const dots = Array.from({ length: 64 });
  return (
    <GlassCard className="relative overflow-hidden p-0">
      <div ref={ref} className="relative grid h-72 grid-cols-8 gap-2 p-6">
        <div className="absolute inset-x-0 top-3 flex items-center justify-between px-4 text-[10px] uppercase tracking-[0.3em] text-sky-900/70 dark:text-cyan-200/80">
          <span className="inline-flex items-center gap-1.5"><Waves size={12} /> magnetic dots</span>
          <span>move your cursor</span>
        </div>

        {dots.map((_, i) => {
          const col = i % 8;
          const row = Math.floor(i / 8);
          const cx = (col + 0.5) * (100 / 8);
          const cy = (row + 0.5) * (100 / 8);
          let dx = 0, dy = 0, mag = 0;
          if (pos && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const px = (pos.x / rect.width) * 100;
            const py = (pos.y / rect.height) * 100;
            const ddx = px - cx;
            const ddy = py - cy;
            const dist = Math.hypot(ddx, ddy);
            const pull = Math.max(0, 28 - dist) / 28;
            mag = pull;
            dx = (ddx / Math.max(1, dist)) * pull * 14;
            dy = (ddy / Math.max(1, dist)) * pull * 14;
          }
          return (
            <motion.span
              key={i}
              animate={{ x: dx, y: dy, scale: 1 + mag * 0.6 }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
              className="m-auto h-2 w-2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, #ffffff 0%, #8eeaff 60%, #1abdf5 110%)",
                boxShadow: `0 0 ${4 + mag * 10}px rgba(76,214,255,${0.4 + mag * 0.5})`,
              }}
            />
          );
        })}
      </div>
    </GlassCard>
  );
}
