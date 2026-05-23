import { motion, useScroll, useTransform } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

export function AmbientBackground() {
  const { nx, ny } = useMousePosition();
  const { scrollYProgress } = useScroll();
  const hueShift = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const skyShift = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base aqua sky */}
      <div className="absolute inset-0 bg-aero-sky dark:bg-aero-sky-dark transition-colors duration-700" />

      {/* Animated gradient veil */}
      <motion.div
        className="absolute inset-0 opacity-70 mix-blend-soft-light"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, #b6ecff 0deg, #cdf5e9 90deg, #a8e0ff 180deg, #d6f0ff 270deg, #b6ecff 360deg)",
          filter: "blur(80px)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          rotate: [0, 360],
        }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Sun / aura that follows mouse */}
      <motion.div
        aria-hidden
        className="absolute top-[-12%] left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full"
        style={{
          x: nx * 60,
          y: ny * 30,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(173, 237, 255, 0.5) 30%, rgba(76,214,255,0.15) 55%, transparent 75%)",
          filter: "blur(20px)",
          rotate: hueShift,
        }}
      />

      {/* Cloud streaks */}
      <CloudLayer y={skyShift} />

      {/* Reflective floor */}
      <div className="absolute inset-x-0 bottom-0 h-[28vh] reflect-floor">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-200/40 via-cyan-100/10 to-transparent dark:from-cyan-900/30 dark:via-cyan-800/10" />
        <div className="absolute inset-0 opacity-50 mix-blend-overlay [background:repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0_2px,transparent_2px_8px)]" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.08] grid-fade [background:linear-gradient(to_right,#0a3f5a_1px,transparent_1px),linear-gradient(to_bottom,#0a3f5a_1px,transparent_1px)] [background-size:80px_80px] dark:opacity-[0.12]" />
    </div>
  );
}

function CloudLayer({ y }: { y: import("framer-motion").MotionValue<number> }) {
  const clouds = Array.from({ length: 7 });
  return (
    <motion.div className="absolute inset-0" style={{ y }}>
      {clouds.map((_, i) => {
        const top = 8 + i * 11 + (i % 2 === 0 ? 2 : -3);
        const dur = 80 + i * 14;
        const size = 280 + (i % 3) * 120;
        const opacity = 0.18 + (i % 4) * 0.05;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${top}%`,
              left: `-30%`,
              width: size,
              height: size * 0.45,
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.35) 40%, transparent 70%)",
              filter: "blur(18px)",
              opacity,
            }}
            animate={{ x: ["0%", "180%"] }}
            transition={{ duration: dur, repeat: Infinity, ease: "linear", delay: -i * 8 }}
          />
        );
      })}
    </motion.div>
  );
}
