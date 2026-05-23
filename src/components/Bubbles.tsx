import { useMemo } from "react";
import { motion } from "framer-motion";
import { seededRand } from "@/lib/utils";

interface BubblesProps {
  count?: number;
  seed?: string;
  className?: string;
}

export function Bubbles({ count = 28, seed = "marwa-aero", className }: BubblesProps) {
  const bubbles = useMemo(() => {
    const rand = seededRand(seed);
    return Array.from({ length: count }, (_, i) => {
      const size = 18 + rand() * 110;
      const left = rand() * 100;
      const delay = rand() * 8;
      const duration = 14 + rand() * 22;
      const drift = -10 + rand() * 20;
      const opacity = 0.25 + rand() * 0.55;
      return { i, size, left, delay, duration, drift, opacity };
    });
  }, [count, seed]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {bubbles.map((b) => (
        <motion.span
          key={b.i}
          className="absolute rounded-full"
          style={{
            left: `${b.left}%`,
            bottom: -120,
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            background:
              "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 25%, rgba(180,230,255,0.18) 55%, rgba(80,160,220,0.05) 80%, transparent 100%)",
            boxShadow:
              "inset 0 0 12px rgba(255,255,255,0.7), inset 0 -6px 18px rgba(80,160,220,0.35), 0 0 14px rgba(180,230,255,0.35)",
          }}
          animate={{
            y: [0, -1200],
            x: [0, b.drift * 8, b.drift * -6],
            scale: [1, 1.05, 0.92, 1],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
