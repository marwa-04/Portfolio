import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Loader() {
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-aero-sky dark:bg-aero-sky-dark"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <div className="relative flex flex-col items-center gap-6">
            {/* Bubble */}
            <motion.div
              className="relative h-32 w-32 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 25%, rgba(180,230,255,0.25) 55%, rgba(80,160,220,0.05) 85%, transparent 100%)",
                boxShadow:
                  "inset 0 0 24px rgba(255,255,255,0.7), inset 0 -10px 30px rgba(80,160,220,0.4), 0 0 40px rgba(180,230,255,0.5)",
              }}
              animate={{ y: [0, -10, 0], rotate: [0, 8, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-2 rounded-full border border-white/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
                  ME
                </span>
              </div>
            </motion.div>

            <div className="w-56">
              <div className="mb-2 flex justify-between text-[11px] uppercase tracking-[0.2em] text-sky-900/70 dark:text-cyan-200/70">
                <span>Booting experience</span>
                <span>{pct}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/30 dark:bg-cyan-900/30 backdrop-blur">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background:
                      "linear-gradient(90deg, #ffffff 0%, #8eeaff 45%, #4cd6ff 75%, #1abdf5 100%)",
                    boxShadow: "0 0 12px rgba(76,214,255,0.8)",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
