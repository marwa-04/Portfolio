import { motion } from "framer-motion";
import { SectionHeading } from "./About";
import { GlassCard } from "@/components/ui/GlassCard";
import { profile } from "@/data/profile";

const groups: { label: string; items: string[]; tint: string }[] = [
  { label: "Languages", items: profile.skills.Languages, tint: "#4cd6ff" },
  { label: "Frontend & Mobile", items: profile.skills["Frontend & Mobile"], tint: "#7be4a8" },
  { label: "Game Dev & Tools", items: profile.skills["Game Dev & Tools"], tint: "#b58cff" },
  { label: "Exploring", items: profile.skills.Exploring, tint: "#ffd07b" },
];

export function TechStack() {
  return (
    <section id="techstack" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="06 · Ecosystem"
          title="Tech Stack Ecosystem"
          subtitle="A living atlas of what I reach for — every tool sitting on its own glossy island."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <GlassCard className="h-full p-6" interactive glow>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-sky-900 dark:text-cyan-50">
                    {g.label}
                  </h3>
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 30% 25%, #ffffff 0%, ${g.tint} 75%, #082e44 130%)`,
                      boxShadow: `0 0 12px ${g.tint}aa`,
                    }}
                  />
                </div>

                <div className="space-y-2.5">
                  {g.items.map((item, idx) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: idx * 0.04 }}
                      className="flex items-center gap-3 rounded-2xl bg-white/35 px-3 py-2 text-[12.5px] font-medium text-sky-900 backdrop-blur-sm dark:bg-cyan-500/10 dark:text-cyan-50"
                      style={{
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.7)`,
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: g.tint, boxShadow: `0 0 6px ${g.tint}` }}
                      />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
