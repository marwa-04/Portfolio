import { motion } from "framer-motion";
import { Award, ExternalLink, Linkedin, BadgeCheck } from "lucide-react";
import { SectionHeading } from "./About";
import { GlassCard } from "@/components/ui/GlassCard";
import { profile } from "@/data/profile";

export function Certifications() {
  const linkedinCertsUrl = `${profile.linkedin.replace(/\/$/, "")}/details/certifications/`;
  const certs = profile.certifications;
  const hasCerts = certs.length > 0;

  return (
    <section id="certifications" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="07 · Credentials"
          title="Credentials"
          subtitle={profile.certificationsNote}
        />

        {hasCerts ? (
          <>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {certs.map((c, i) => (
                <motion.a
                  key={`${c.title}-${i}`}
                  href={c.url || linkedinCertsUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  initial={{ opacity: 0, y: 30, rotateX: -12 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: (i % 6) * 0.07 }}
                  whileHover={{ y: -6, rotateY: 4, scale: 1.02 }}
                  style={{ perspective: 800 }}
                  className="group block"
                >
                  <GlassCard interactive glow className="relative h-full p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <div
                        className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 25%, #ffffff 0%, #bfeeff 30%, #4cd6ff 70%, #0a78a8 100%)",
                          boxShadow: "0 0 16px rgba(76,214,255,0.6)",
                        }}
                      >
                        <Award size={18} />
                      </div>
                      <ExternalLink
                        size={14}
                        className="text-sky-700/70 transition group-hover:-translate-y-1 group-hover:translate-x-1 dark:text-cyan-200/70"
                      />
                    </div>

                    <h3 className="text-[14.5px] font-semibold leading-snug text-sky-900 dark:text-cyan-50">
                      {c.title}
                    </h3>
                    <div className="mt-1 text-[12px] text-sky-700 dark:text-cyan-200/80">
                      {c.issuer}
                    </div>

                    {c.description && (
                      <p className="mt-3 line-clamp-3 text-[12.5px] leading-relaxed text-sky-900/75 dark:text-cyan-100/75">
                        {c.description}
                      </p>
                    )}

                    {c.credentialId && (
                      <div className="mt-3 text-[10.5px] uppercase tracking-[0.18em] text-sky-700/70 dark:text-cyan-300/70">
                        Credential ID ·{" "}
                        <span className="font-mono tracking-normal text-sky-900 dark:text-cyan-100">
                          {c.credentialId}
                        </span>
                      </div>
                    )}

                    <div className="mt-5 flex items-center justify-between">
                      {c.date ? (
                        <span className="aero-chip text-[10px]">{c.date}</span>
                      ) : (
                        <span />
                      )}
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-sky-700/70 dark:text-cyan-300/70">
                        <BadgeCheck size={11} /> verified
                      </span>
                    </div>

                    {/* Holo ribbon */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rotate-12 rounded-full opacity-60"
                      style={{
                        background:
                          "conic-gradient(from 90deg, rgba(255,255,255,0.7), rgba(140,220,255,0.2), rgba(255,255,255,0.5), rgba(140,220,255,0.1))",
                        filter: "blur(8px)",
                      }}
                    />
                  </GlassCard>
                </motion.a>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href={linkedinCertsUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="aero-button"
              >
                <Linkedin size={16} /> See full list on LinkedIn{" "}
                <ExternalLink size={14} />
              </a>
            </div>
          </>
        ) : (
          <motion.a
            href={linkedinCertsUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="mt-12 block"
          >
            <GlassCard interactive glow className="relative p-7 sm:p-9">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-5">
                  <div
                    className="grid h-16 w-16 place-items-center rounded-2xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 25%, #ffffff 0%, #bfeeff 30%, #4cd6ff 70%, #0a78a8 100%)",
                      boxShadow: "0 0 22px rgba(76,214,255,0.6)",
                    }}
                  >
                    <Award size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-sky-700/80 dark:text-cyan-300/80">
                      <BadgeCheck size={12} /> live source · LinkedIn
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-sky-900 dark:text-cyan-50">
                      See certifications on LinkedIn
                    </h3>
                    <p className="mt-1 max-w-md text-[13px] text-sky-900/75 dark:text-cyan-100/75">
                      The canonical, verified list lives there.
                    </p>
                  </div>
                </div>

                <span className="aero-button shrink-0">
                  <Linkedin size={16} /> Open profile <ExternalLink size={14} />
                </span>
              </div>
            </GlassCard>
          </motion.a>
        )}
      </div>
    </section>
  );
}
