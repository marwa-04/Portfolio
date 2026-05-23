import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 30, stiffness: 350, mass: 0.4 });
  const sy = useSpring(y, { damping: 30, stiffness: 350, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only attach on fine pointers (mouse / trackpad)
    const supportsFine = window.matchMedia("(pointer: fine)").matches;
    if (!supportsFine) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest(
        'a, button, [role="button"], [data-cursor="hover"], input, textarea, select'
      );
      setHover(interactive);
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.body.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
        style={{ x: sx, y: sy }}
        animate={{ scale: hover ? 1.7 : 1, opacity: hover ? 0.95 : 0.85 }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
      >
        <div
          className="h-8 w-8 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95) 0%, rgba(140,220,255,0.7) 40%, rgba(76,214,255,0.5) 65%, transparent 85%)",
            boxShadow:
              "0 0 22px rgba(76,214,255,0.7), inset 0 0 10px rgba(255,255,255,0.8)",
          }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99] -translate-x-1/2 -translate-y-1/2"
        style={{ x, y }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
      </motion.div>
    </>
  );
}
