import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ExternalLink, GitFork, Github, Globe, Sparkles, Star } from "lucide-react";
import { SectionHeading } from "./About";
import { GlassCard } from "@/components/ui/GlassCard";
import { useGitHubData } from "@/context/GitHubContext";
import { rankRepos } from "@/lib/github";
import { profile } from "@/data/profile";
import { cn, formatDate, langColor, prettyName } from "@/lib/utils";

const excludedSet = new Set(
  profile.excludedRepos.map((n) => n.toLowerCase())
);

export function Projects() {
  const { data, loading, error } = useGitHubData();
  const [active, setActive] = useState<string>("all");

  const repos = useMemo(() => {
    if (!data) return [];
    const visible = data.repos.filter(
      (r) => !excludedSet.has(r.name.toLowerCase())
    );
    return rankRepos(visible);
  }, [data]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => r.language && set.add(r.language));
    return ["all", ...Array.from(set)];
  }, [repos]);

  const filtered = useMemo(
    () =>
      active === "all"
        ? repos
        : repos.filter((r) => r.language === active),
    [repos, active]
  );

  return (
    <section id="projects" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="02 · Galaxy"
          title="Project Galaxy"
          subtitle="A living constellation of repositories, auto-synced from GitHub. Click any planet to dive in."
        />

        {/* Featured */}
        {profile.featuredProjects.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="mt-12 block"
          >
            <GlassCard interactive glow className="relative overflow-hidden p-7 sm:p-9">
              <div className="grid items-center gap-6 lg:grid-cols-[auto_1fr_auto]">
                <div
                  className="grid h-20 w-20 place-items-center rounded-3xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
                  style={{
                    background: `radial-gradient(circle at 30% 25%, #ffffff 0%, ${p.color} 70%, #082e44 130%)`,
                    boxShadow: `0 0 28px ${p.color}88`,
                  }}
                >
                  <Sparkles size={28} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-sky-700/80 dark:text-cyan-300/80">
                    <span>{p.tag}</span>
                    <span className="opacity-40">·</span>
                    <span>{p.language}</span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-sky-900 dark:text-cyan-50 sm:text-3xl">
                    {p.prettyName}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-sky-900/80 dark:text-cyan-100/80">
                    {p.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.topics.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-sky-700 dark:bg-cyan-500/15 dark:text-cyan-100"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2 lg:items-end">
                  <span className="aero-button">
                    Play <ExternalLink size={14} />
                  </span>
                  <a
                    href={p.studioHref}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] uppercase tracking-[0.22em] text-sky-700/80 hover:text-cyan-500 dark:text-cyan-300/80"
                  >
                    {p.studioLabel} →
                  </a>
                </div>
              </div>

              {/* Holo ribbon */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rotate-12 rounded-full opacity-60"
                style={{
                  background:
                    "conic-gradient(from 90deg, rgba(255,255,255,0.7), rgba(140,220,255,0.2), rgba(255,255,255,0.5), rgba(140,220,255,0.1))",
                  filter: "blur(14px)",
                }}
              />
            </GlassCard>
          </motion.a>
        ))}

        {/* Filters */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              data-cursor="hover"
              className={cn(
                "aero-chip transition",
                active === c &&
                  "ring-2 ring-cyan-300/70 shadow-aquaGlow scale-[1.03]"
              )}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: c === "all" ? "#7bd6ff" : langColor(c) }}
              />
              {c === "all" ? "All" : c} {c !== "all" && (
                <span className="opacity-60">
                  ({repos.filter((r) => r.language === c).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

          {error && !data && (
            <GlassCard className="col-span-full p-8 text-center text-sky-900 dark:text-cyan-100">
              <p className="text-sm">
                Couldn't reach the GitHub API right now — showing fallback projects.
              </p>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {profile.projectsFallback.map((p) => (
                  <FallbackCard key={p.name} name={p.name} description={p.description} />
                ))}
              </div>
            </GlassCard>
          )}

          {filtered.map((r, idx) => (
            <motion.a
              key={r.id}
              href={r.html_url}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: (idx % 6) * 0.06 }}
              whileHover={{ y: -8, rotateX: 4, rotateY: -4, scale: 1.02 }}
              className="group"
              style={{ perspective: 900 }}
            >
              <GlassCard className="h-full p-6">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="grid h-9 w-9 place-items-center rounded-xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
                      style={{
                        background: `radial-gradient(circle at 30% 25%, #ffffff 0%, ${langColor(
                          r.language
                        )} 75%, #082e44 130%)`,
                      }}
                    >
                      <Github size={14} />
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold text-sky-900 dark:text-cyan-50">
                        {prettyName(r.name)}
                      </h3>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-sky-700/70 dark:text-cyan-300/70">
                        {r.language ?? "code"} · {formatDate(r.pushed_at)}
                      </p>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-sky-700/70 dark:text-cyan-200/70 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <p className="mt-4 line-clamp-3 min-h-[3.6em] text-[13.5px] leading-relaxed text-sky-900/80 dark:text-cyan-100/80">
                  {r.description || `Exploration project — ${prettyName(r.name)} built with ${r.language ?? "multiple technologies"}.`}
                </p>

                {/* Stats strip */}
                <div className="mt-5 flex items-center gap-4 text-[11px] text-sky-800/80 dark:text-cyan-200/80">
                  <span className="inline-flex items-center gap-1"><Star size={12} /> {r.stargazers_count}</span>
                  <span className="inline-flex items-center gap-1"><GitFork size={12} /> {r.forks_count}</span>
                  {r.has_pages && <span className="inline-flex items-center gap-1"><Globe size={12} /> live</span>}
                </div>

                {/* Topics */}
                {r.topics && r.topics.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {r.topics.slice(0, 4).map((t) => (
                      <span key={t} className="rounded-full bg-white/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-sky-700 dark:bg-cyan-500/15 dark:text-cyan-100">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </GlassCard>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkeletonCard() {
  return (
    <GlassCard className="h-56 p-6">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 animate-pulse rounded-xl bg-white/50 dark:bg-cyan-700/30" />
        <div className="space-y-2">
          <div className="h-3 w-32 animate-pulse rounded-full bg-white/50 dark:bg-cyan-700/30" />
          <div className="h-2 w-20 animate-pulse rounded-full bg-white/40 dark:bg-cyan-700/20" />
        </div>
      </div>
      <div className="mt-6 space-y-2">
        <div className="h-2 w-full animate-pulse rounded-full bg-white/40 dark:bg-cyan-700/20" />
        <div className="h-2 w-4/5 animate-pulse rounded-full bg-white/40 dark:bg-cyan-700/20" />
        <div className="h-2 w-2/3 animate-pulse rounded-full bg-white/40 dark:bg-cyan-700/20" />
      </div>
    </GlassCard>
  );
}

function FallbackCard({ name, description }: { name: string; description: string }) {
  return (
    <GlassCard className="p-6">
      <h3 className="text-sm font-semibold text-sky-900 dark:text-cyan-50">{prettyName(name)}</h3>
      <p className="mt-2 text-xs text-sky-900/80 dark:text-cyan-100/80">{description}</p>
    </GlassCard>
  );
}
