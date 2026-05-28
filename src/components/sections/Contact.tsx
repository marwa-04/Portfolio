import { motion } from "framer-motion";
import { useState } from "react";
import { Github, Linkedin, Mail, Send, Sparkles } from "lucide-react";
import { SectionHeading } from "./About";
import { GlassCard } from "@/components/ui/GlassCard";
import { profile } from "@/data/profile";
import { Bubbles } from "@/components/Bubbles";

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio contact — ${name || "Hello"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative px-6 py-28 sm:py-36">
      <Bubbles count={18} seed="contact" />
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          kicker="09 · Whisper"
          title="Say hello"
          subtitle="Got an idea, a question, or just want to nerd out about Aero UIs? My inbox is open."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Contact cards */}
          <div className="space-y-4">
            <ContactItem
              icon={Mail}
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
            />
            <ContactItem
              icon={Github}
              label="GitHub"
              value={`@${profile.githubUser}`}
              href={profile.github}
            />
            <ContactItem
              icon={Linkedin}
              label="LinkedIn"
              value="marwa-el-azzazi"
              href={profile.linkedin}
            />
            <GlassCard variant="soft" className="p-5">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-sky-700/80 dark:text-cyan-300/80">
                <Sparkles size={12} /> response window
              </div>
              <p className="mt-2 text-sm text-sky-900/85 dark:text-cyan-100/85">
                I usually reply within 24–48h. Coffee tales, internship offers and weird collaboration ideas are all welcome.
              </p>
            </GlassCard>
          </div>

          {/* Form */}
          <GlassCard className="p-6 sm:p-7">
            <form onSubmit={onSubmit} className="space-y-4">
              <Field name="name" label="Your name" placeholder="e.g. Yuki Tanaka" />
              <Field name="email" type="email" label="Email" placeholder="you@hello.com" />
              <Field
                name="message"
                label="Message"
                placeholder="Tell me about your idea, project, or moodboard…"
                textarea
              />
              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ y: -2 }}
                type="submit"
                className="aero-button w-full justify-center"
                data-cursor="hover"
              >
                {sent ? "Opening your mail client…" : "Send the whisper"} <Send size={16} />
              </motion.button>
              <p className="text-[11px] text-sky-700/70 dark:text-cyan-300/70">
                This form uses <code className="font-mono">mailto:</code> — no servers, no tracking, just a soft hello.
              </p>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ size?: string | number; className?: string }>;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" data-cursor="hover" className="block">
      <GlassCard interactive glow className="p-5">
        <div className="flex items-center gap-4">
          <div
            className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
            style={{
              background:
                "radial-gradient(circle at 30% 25%, #ffffff 0%, #bfeeff 30%, #4cd6ff 75%, #0a78a8 110%)",
            }}
          >
            <Icon size={18} />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-sky-700/80 dark:text-cyan-300/80">
              {label}
            </div>
            <div className="text-sm font-semibold text-sky-900 dark:text-cyan-50">{value}</div>
          </div>
        </div>
      </GlassCard>
    </a>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  textarea = false,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
}) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] uppercase tracking-[0.3em] text-sky-700/80 dark:text-cyan-300/80">
        {label}
      </span>
      <Tag
        name={name}
        type={type}
        placeholder={placeholder}
        rows={textarea ? 4 : undefined}
        className="w-full rounded-2xl border border-white/40 bg-white/40 px-4 py-3 text-sm text-sky-900 placeholder:text-sky-700/40 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] outline-none transition focus:border-cyan-300 focus:bg-white/60 focus:ring-2 focus:ring-cyan-300/40 dark:border-cyan-300/20 dark:bg-cyan-900/30 dark:text-cyan-50 dark:placeholder:text-cyan-200/40"
        required
      />
    </label>
  );
}
