import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Sparkles, Github, Linkedin } from "lucide-react";
import { profile } from "@/data/profile";
import { Bubbles } from "@/components/Bubbles";
import { useMousePosition } from "@/hooks/useMousePosition";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const { nx, ny } = useMousePosition();

  return (
    <section
      ref={ref}
      id="home"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden pt-24"
    >
      <Bubbles count={30} seed="hero" />

      {/* Floating glass orb (avatar) */}
      <motion.div
        className="absolute right-[6%] top-[18%] hidden md:block"
        style={{ y: orbY, x: nx * -22 }}
      >
        <motion.div
          className="relative h-72 w-72 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.95) 0%, rgba(180,238,255,0.55) 30%, rgba(76,214,255,0.35) 55%, rgba(10,120,168,0.2) 85%, transparent 100%)",
            boxShadow:
              "inset 0 0 40px rgba(255,255,255,0.7), inset 0 -22px 60px rgba(8,98,138,0.45), 0 30px 80px rgba(8,98,138,0.45)",
          }}
          animate={{ y: [0, -16, 0], rotate: [0, 4, -3, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="absolute inset-6 rounded-full object-cover ring-2 ring-white/60 shadow-[0_8px_30px_rgba(8,98,138,0.4)]"
            loading="eager"
            decoding="async"
          />
          <motion.div
            className="absolute -inset-2 rounded-full border border-white/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl px-6"
        style={{ opacity }}
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="aero-chip mb-6"
        >
          <Sparkles size={14} className="text-sky-700" />
          <span>Frutiger Aero · live GitHub portfolio</span>
        </motion.div>

        <motion.h1
          style={{ y: titleY }}
          className="aero-title font-display text-[14vw] sm:text-[10vw] md:text-[8vw] lg:text-[7.6rem] font-extrabold leading-[0.95] tracking-tight"
        >
          <span className="block">Hi, I'm</span>
          <span className="block">{profile.name}.</span>
        </motion.h1>

        <motion.p
          style={{ y: subY }}
          className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-sky-900/85 dark:text-cyan-100/85"
        >
          {profile.longTagline}
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a href="#projects" className="aero-button" data-cursor="hover">
            Explore the work <ArrowDown size={16} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="aero-chip"
            data-cursor="hover"
          >
            <Github size={14} /> @{profile.githubUser}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="aero-chip" data-cursor="hover">
            <Linkedin size={14} /> LinkedIn
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sky-800/70 dark:text-cyan-200/80"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
          <span>scroll</span>
          <ArrowDown size={14} />
        </div>
      </motion.div>
    </section>
  );
}
