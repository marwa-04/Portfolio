import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./About";
import { GlassCard } from "@/components/ui/GlassCard";
import { useGitHubData } from "@/context/GitHubContext";
import { buildHeatmap } from "@/lib/github";
import { langColor } from "@/lib/utils";
import { Activity, Code, GitBranch, Layers, Sparkles } from "lucide-react";

function useCountUp(target: number, duration = 1200) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}

export function Stats() {
  const { data, loading } = useGitHubData();
  const repos = data?.repos.length ?? 0;
  const years = data?.yearsActive ?? 2;
  const topLang = data?.topLanguages?.[0]?.name ?? "—";
  const langCount = data?.topLanguages?.length ?? 0;
  const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;
  const active =
    data?.repos.filter(
      (r) => Date.now() - new Date(r.pushed_at).getTime() < ninetyDaysMs
    ).length ?? 0;

  return (
    <section id="stats" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="05 · Pulse"
          title="Live Stats"
          subtitle="Pulled straight from the GitHub API — this dashboard breathes with what I'm building lately."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={Code} label="Public repos" value={repos} loading={loading} />
          <Stat icon={Sparkles} label="Active last 90 days" value={active} loading={loading} />
          <Stat icon={Layers} label="Languages used" value={langCount} loading={loading} />
          <Stat icon={Activity} label="Years on GitHub" value={years} loading={loading} />
        </div>

        <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-sky-700/70 dark:text-cyan-300/70">
          most reached for · <span className="font-semibold text-sky-900 dark:text-cyan-100">{topLang}</span>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Heatmap />
          <Languages />
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  loading,
}: {
  icon: React.ComponentType<{ size?: string | number; className?: string }>;
  label: string;
  value: number;
  loading?: boolean;
}) {
  const display = useCountUp(value);
  return (
    <GlassCard className="p-5" interactive glow>
      <div className="flex items-center justify-between">
        <Icon size={18} className="text-cyan-500" />
        <span className="aero-chip text-[10px]">live</span>
      </div>
      <div className="mt-4 text-3xl font-bold text-sky-900 dark:text-cyan-50 tabular-nums">
        {loading ? "—" : display}
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-sky-700/70 dark:text-cyan-300/70">
        {label}
      </div>
    </GlassCard>
  );
}

function Heatmap() {
  const { data } = useGitHubData();
  const grid = data ? buildHeatmap(data.repos) : Array.from({ length: 52 }, () => Array(7).fill(0));

  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-sky-700/80 dark:text-cyan-300/80">
            activity
          </div>
          <h3 className="mt-1 text-lg font-semibold text-sky-900 dark:text-cyan-50">
            Contribution waves
          </h3>
        </div>
        <GitBranch size={16} className="text-cyan-500" />
      </div>

      <div className="mt-5 flex gap-[3px] overflow-x-auto pb-1">
        {grid.map((week, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {week.map((cell, d) => {
              const intensity = Math.min(1, cell / 5);
              return (
                <motion.span
                  key={d}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: w * 0.005 + d * 0.01 }}
                  className="h-3 w-3 rounded-[4px]"
                  style={{
                    background:
                      intensity === 0
                        ? "rgba(255,255,255,0.18)"
                        : `linear-gradient(135deg, rgba(255,255,255,0.6), rgba(76,214,255,${
                            0.3 + intensity * 0.6
                          }))`,
                    boxShadow: intensity > 0.4 ? "0 0 8px rgba(76,214,255,0.6)" : undefined,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-sky-700/70 dark:text-cyan-300/70">
        <span>52 weeks · derived from push activity</span>
        <span className="flex items-center gap-1.5">
          less
          {[0.15, 0.4, 0.65, 0.9].map((o) => (
            <span
              key={o}
              className="h-2.5 w-2.5 rounded-[3px]"
              style={{ background: `rgba(76,214,255,${o})` }}
            />
          ))}
          more
        </span>
      </div>
    </GlassCard>
  );
}

function Languages() {
  const { data } = useGitHubData();
  const langs = (data?.topLanguages ?? []).slice(0, 6);
  return (
    <GlassCard className="p-5">
      <div className="text-[10px] uppercase tracking-[0.3em] text-sky-700/80 dark:text-cyan-300/80">
        most used
      </div>
      <h3 className="mt-1 text-lg font-semibold text-sky-900 dark:text-cyan-50">
        Languages
      </h3>
      <div className="mt-5 space-y-3">
        {langs.map((l) => (
          <div key={l.name} className="space-y-1.5">
            <div className="flex justify-between text-[12px] text-sky-900/85 dark:text-cyan-100/85">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: langColor(l.name) }} />
                {l.name}
              </span>
              <span className="tabular-nums opacity-70">{Math.round(l.pct * 100)}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/30 dark:bg-cyan-900/40">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${l.pct * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, #ffffff, ${langColor(l.name)})`,
                  boxShadow: `0 0 10px ${langColor(l.name)}aa`,
                }}
              />
            </div>
          </div>
        ))}
        {langs.length === 0 && (
          <div className="text-xs text-sky-800/70 dark:text-cyan-200/70">Loading languages…</div>
        )}
      </div>
    </GlassCard>
  );
}
