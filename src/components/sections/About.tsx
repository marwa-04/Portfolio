import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { profile } from "@/data/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { Sparkles, MapPin, Heart, Zap } from "lucide-react";

const icons = [MapPin, Sparkles, Heart, Zap];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const [videoOk, setVideoOk] = useState(true);

  return (
    <section ref={ref} id="about" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="01 · Identity" title="About" subtitle={profile.about.headline} />

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.05fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {profile.about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[15px] sm:text-base leading-relaxed text-sky-900/85 dark:text-cyan-100/85"
              >
                {p}
              </p>
            ))}

            <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
              {profile.about.facts.map((f, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <GlassCard
                    key={f.label}
                    variant="soft"
                    className="p-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <Icon size={16} className="text-cyan-500" />
                    <div className="mt-3 text-[10px] uppercase tracking-[0.18em] text-sky-700/70 dark:text-cyan-300/70">
                      {f.label}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-sky-900 dark:text-cyan-50">
                      {f.value}
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </motion.div>

          <motion.div style={{ y: imgY }} className="relative">
            <GlassCard className="p-2">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
                {/* Aero scene (always visible — also the fallback when no video) */}
                <AeroScene />

                {/* Optional video overlay — drop a file at public/about.mp4 to enable */}
                {videoOk && (
                  <video
                    src="/about.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="Frutiger Aero ambient loop"
                    onError={() => setVideoOk(false)}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}

                {/* Glossy sheen */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cyan-200/20 via-transparent to-white/40 mix-blend-overlay" />
                <div className="pointer-events-none absolute inset-x-3 top-3 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

                {/* Floating sticker */}
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-4 right-4"
                >
                  <div className="aero-chip text-[11px]">
                    <Sparkles size={12} /> Currently · iOS · React Native
                  </div>
                </motion.div>
              </div>
            </GlassCard>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {["dreamer", "builder", "designer"].map((w) => (
                <div
                  key={w}
                  className="glass-soft text-center py-3 text-xs uppercase tracking-[0.18em] text-sky-800 dark:text-cyan-200"
                >
                  {w}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-sky-700/80 dark:text-cyan-300/80"
      >
        {kicker}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="aero-title mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-4 max-w-2xl text-sky-900/80 dark:text-cyan-100/80"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Animated Frutiger Aero scene — used as the About visual / video fallback. */
/* -------------------------------------------------------------------------- */
function AeroScene() {
  const bubbles = [
    { x: "12%", y: "78%", s: 28, d: 7, delay: 0 },
    { x: "82%", y: "70%", s: 20, d: 6, delay: 1.2 },
    { x: "30%", y: "60%", s: 14, d: 5.5, delay: 0.6 },
    { x: "65%", y: "85%", s: 36, d: 8, delay: 2 },
    { x: "48%", y: "55%", s: 10, d: 4.5, delay: 0.3 },
    { x: "20%", y: "40%", s: 16, d: 6.2, delay: 1.6 },
    { x: "75%", y: "45%", s: 22, d: 7.4, delay: 0.9 },
    { x: "55%", y: "30%", s: 12, d: 5, delay: 2.4 },
  ];

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #d8f1ff 0%, #a4dcf6 38%, #4eb6e4 72%, #1f7fb9 100%)",
      }}
    >
      {/* Soft sun / light source */}
      <div
        className="absolute -top-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full opacity-90"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,247,210,0.85) 30%, rgba(255,231,168,0) 70%)",
          filter: "blur(6px)",
        }}
      />

      {/* Drifting clouds */}
      <motion.div
        className="absolute inset-x-0 top-[18%] h-20 opacity-80"
        style={{
          background:
            "radial-gradient(60% 100% at 20% 50%, rgba(255,255,255,0.9), rgba(255,255,255,0) 70%), radial-gradient(50% 100% at 65% 60%, rgba(255,255,255,0.7), rgba(255,255,255,0) 70%)",
        }}
        animate={{ x: ["-6%", "6%", "-6%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Distant glossy hill */}
      <div
        className="absolute -bottom-10 left-[-10%] right-[-10%] h-[42%] rounded-[50%]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #b9f0c8 0%, #6bd09a 45%, #2f8a6a 100%)",
          boxShadow: "inset 0 8px 30px rgba(255,255,255,0.55)",
        }}
      />
      {/* Front glossy hill */}
      <div
        className="absolute -bottom-16 left-[-20%] right-[-5%] h-[34%] rounded-[50%]"
        style={{
          background:
            "radial-gradient(ellipse at 40% 30%, #d8fbe5 0%, #7be4a8 50%, #1f7a55 100%)",
          boxShadow: "inset 0 10px 28px rgba(255,255,255,0.6)",
        }}
      />

      {/* Light shaft */}
      <motion.div
        className="absolute -top-10 left-1/3 h-[120%] w-32 -rotate-12 opacity-50"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0))",
          filter: "blur(14px)",
        }}
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rising bubbles */}
      {bubbles.map((b, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: b.x,
            top: b.y,
            width: b.s,
            height: b.s,
            background:
              "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.95) 0%, rgba(190,235,255,0.6) 55%, rgba(76,214,255,0.15) 100%)",
            boxShadow:
              "inset 0 1px 2px rgba(255,255,255,0.9), 0 0 12px rgba(173,237,255,0.45)",
          }}
          animate={{
            y: [0, -180, -360],
            x: [0, b.s * 0.4, -b.s * 0.3, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: b.d,
            repeat: Infinity,
            delay: b.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
