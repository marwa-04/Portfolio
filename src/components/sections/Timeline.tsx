import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { SectionHeading } from "./About";
import { GlassCard } from "@/components/ui/GlassCard";
import { profile } from "@/data/profile";

const blocks = [
  { kind: "experience", icon: Briefcase, color: "#4cd6ff" },
  { kind: "education", icon: GraduationCap, color: "#a3e7ff" },
] as const;

export function Timeline() {
  // Merge all entries into a single chronological feed
  const entries = [
    ...profile.experience.map((e) => ({
      kind: "experience" as const,
      title: e.title,
      org: e.org,
      period: e.period,
      summary: e.summary,
      tags: e.tags,
    })),
    ...profile.education.map((e) => ({
      kind: "education" as const,
      title: e.degree,
      org: e.school,
      period: e.period,
      summary: "",
      tags: [] as string[],
    })),
  ];

  return (
    <section id="timeline" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          kicker="04 · Journey"
          title="Timeline"
          subtitle="A glossy river of milestones — training, study and the moments that shaped how I build."
        />

        <div className="relative mt-16">
          {/* Center line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-300/70 to-transparent" />

          <div className="space-y-10">
            {entries.map((entry, i) => {
              const meta = blocks.find((b) => b.kind === entry.kind)!;
              const Icon = meta.icon;
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={`${entry.kind}-${i}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.05 * i }}
                  className={`relative flex items-start gap-4 sm:gap-8 ${
                    left ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Node */}
                  <div className="relative z-10 ml-0 sm:ml-auto sm:mr-auto flex shrink-0 items-center justify-center">
                    <div
                      className="grid h-10 w-10 place-items-center rounded-full text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                      style={{
                        background: `radial-gradient(circle at 30% 25%, #ffffff 0%, ${meta.color} 70%, #064a6b 130%)`,
                        boxShadow: `0 0 18px ${meta.color}aa`,
                      }}
                    >
                      <Icon size={16} />
                    </div>
                  </div>

                  {/* Card */}
                  <GlassCard
                    interactive
                    className={`w-full sm:w-[calc(50%-2rem)] p-5`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-sky-700/70 dark:text-cyan-300/70">
                        {entry.kind}
                      </div>
                      <div className="aero-chip text-[10px]">{entry.period}</div>
                    </div>
                    <h3 className="mt-2 text-base font-semibold text-sky-900 dark:text-cyan-50">
                      {entry.title}
                    </h3>
                    <div className="text-[12px] text-sky-700 dark:text-cyan-200/80">
                      {entry.org}
                    </div>
                    {entry.summary && (
                      <p className="mt-3 text-[13px] leading-relaxed text-sky-900/80 dark:text-cyan-100/80">
                        {entry.summary}
                      </p>
                    )}
                    {entry.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {entry.tags.map((t) => (
                          <span key={t} className="aero-chip text-[10px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
