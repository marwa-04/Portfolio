import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./About";
import { GlassCard } from "@/components/ui/GlassCard";
import { profile } from "@/data/profile";
import { useMousePosition } from "@/hooks/useMousePosition";

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="03 · Constellation"
          title="Skills Constellation"
          subtitle="The tech I gravitate toward — sized by frequency, glowing by affinity. Move your cursor to drift the orbit."
        />

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Constellation />

          <div className="space-y-4">
            {Object.entries(profile.skills).map(([group, items], i) => (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
              >
                <GlassCard variant="soft" className="p-5">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-sky-700/80 dark:text-cyan-300/80">
                    {group}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {items.map((s) => (
                      <span key={s} className="aero-chip text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Constellation() {
  const wrap = useRef<HTMLDivElement>(null);
  const { nx, ny } = useMousePosition();

  const stars = useMemo(() => {
    return profile.techConstellation.map((t, i) => {
      const angle = (i / profile.techConstellation.length) * Math.PI * 2;
      const ring = i % 3;
      const radius = 0.32 + ring * 0.18; // normalized
      const x = 0.5 + Math.cos(angle + i * 0.4) * radius;
      const y = 0.5 + Math.sin(angle + i * 0.4) * radius * 0.78;
      return { ...t, x, y, ring };
    });
  }, []);

  return (
    <GlassCard className="relative aspect-[5/4] overflow-hidden p-0">
      <div ref={wrap} className="relative h-full w-full">
        {/* Sun core */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, #ffffff 0%, #bfeeff 30%, #4cd6ff 70%, #0a78a8 100%)",
            boxShadow:
              "0 0 50px rgba(76,214,255,0.8), inset 0 -10px 30px rgba(8,98,138,0.5)",
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbit rings */}
        {[0, 1, 2].map((r) => (
          <div
            key={r}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 dark:border-cyan-300/15"
            style={{ width: `${40 + r * 22}%`, height: `${30 + r * 18}%` }}
          />
        ))}

        {/* Stars */}
        {stars.map((s, i) => {
          const drift = (s.ring + 1) * 14;
          return (
            <motion.div
              key={s.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${s.x * 100}%`,
                top: `${s.y * 100}%`,
              }}
              animate={{
                x: nx * drift,
                y: ny * drift,
              }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                className="group relative cursor-default"
              >
                <div
                  className="rounded-full"
                  style={{
                    width: 10 + s.weight * 18,
                    height: 10 + s.weight * 18,
                    background: `radial-gradient(circle at 30% 25%, #ffffff 0%, ${s.color} 75%, #06283b 130%)`,
                    boxShadow: `0 0 18px ${s.color}aa, inset 0 0 8px rgba(255,255,255,0.7)`,
                  }}
                />
                <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-sky-900 opacity-0 backdrop-blur transition group-hover:opacity-100 dark:bg-cyan-900/70 dark:text-cyan-50">
                  {s.name}
                </span>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Sparkle dust */}
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-px w-px rounded-full bg-white/80"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              opacity: 0.4 + (i % 5) * 0.1,
              boxShadow: "0 0 6px rgba(255,255,255,0.8)",
            }}
          />
        ))}
      </div>
    </GlassCard>
  );
}
