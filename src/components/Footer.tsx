import { Github, Heart, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="relative px-6 pb-12 pt-10">
      <div className="mx-auto max-w-6xl">
        <div className="glass-soft flex flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row">
          <div className="text-[11px] uppercase tracking-[0.3em] text-sky-700/80 dark:text-cyan-300/80">
            © {new Date().getFullYear()} {profile.name}
          </div>
          <div className="flex items-center gap-2 text-[12px] text-sky-800/85 dark:text-cyan-100/85">
            <span>crafted with</span>
            <Heart size={12} className="text-rose-400" />
            <span>· React · Framer Motion · Aero dreams</span>
          </div>
          <div className="flex items-center gap-2">
            <a href={`mailto:${profile.email}`} aria-label="Email" className="aero-chip" data-cursor="hover">
              <Mail size={12} />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="aero-chip" data-cursor="hover">
              <Github size={12} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="aero-chip" data-cursor="hover">
              <Linkedin size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
