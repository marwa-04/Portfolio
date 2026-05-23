import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Github, Linkedin, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/useMousePosition";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "timeline", label: "Journey" },
  { id: "stats", label: "Stats" },
  { id: "playground", label: "Play" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const { scrollYProgress } = useScroll();
  const indicatorWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  const goto = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed left-1/2 top-4 z-50 w-[min(96vw,1100px)] -translate-x-1/2"
      >
        <div className="glass relative flex items-center justify-between gap-3 px-4 py-2.5">
          <button
            onClick={() => goto("home")}
            data-cursor="hover"
            className="group flex items-center gap-2.5"
            aria-label="Home"
          >
            <span
              className="grid h-9 w-9 place-items-center rounded-full text-sm font-bold text-sky-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, #ffffff 0%, #bfeeff 35%, #4cd6ff 75%, #0a78a8 100%)",
              }}
            >
              ME
            </span>
            <div className="hidden sm:block leading-tight text-left">
              <div className="text-sm font-semibold text-sky-900 dark:text-cyan-100">
                {profile.shortName}
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-sky-700/80 dark:text-cyan-300/70">
                {profile.role}
              </div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => goto(l.id)}
                data-cursor="hover"
                className="relative rounded-full px-3 py-1.5 text-[13px] font-medium text-sky-900/80 transition hover:text-sky-900 dark:text-cyan-100/80 dark:hover:text-cyan-50"
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-0 -z-0 rounded-full opacity-0 transition group-hover:opacity-100" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full text-sky-900/80 hover:bg-white/40 dark:text-cyan-100 dark:hover:bg-cyan-500/10"
              aria-label="GitHub"
              data-cursor="hover"
            >
              <Github size={16} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full text-sky-900/80 hover:bg-white/40 dark:text-cyan-100 dark:hover:bg-cyan-500/10"
              aria-label="LinkedIn"
              data-cursor="hover"
            >
              <Linkedin size={16} />
            </a>
            <button
              onClick={toggle}
              className="grid h-9 w-9 place-items-center rounded-full text-sky-900/80 hover:bg-white/40 dark:text-cyan-100 dark:hover:bg-cyan-500/10"
              aria-label="Toggle theme"
              data-cursor="hover"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid h-9 w-9 place-items-center rounded-full text-sky-900/80 hover:bg-white/40 md:hidden dark:text-cyan-100"
              aria-label="Menu"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>

          {/* Scroll progress ribbon */}
          <motion.span
            aria-hidden
            style={{ width: indicatorWidth }}
            className="absolute -bottom-px left-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
          />
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          className={cn("md:hidden mt-2 overflow-hidden rounded-2xl", open && "glass")}
        >
          <div className="grid grid-cols-2 gap-1 p-3">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => goto(l.id)}
                className="aero-chip justify-center"
              >
                {l.label}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.header>
    </>
  );
}
