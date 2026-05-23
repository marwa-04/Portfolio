import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "soft";
  interactive?: boolean;
  glow?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", interactive = false, glow = false, children, ...rest }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          variant === "soft" ? "glass-soft" : "glass",
          "relative overflow-hidden",
          interactive && "transition-transform will-change-transform hover:-translate-y-1",
          glow && "hover:shadow-aquaGlow",
          className
        )}
        {...rest}
      >
        {/* top-edge sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
        />
        {/* glossy highlight blob */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-10 -left-10 h-32 w-44 rounded-full bg-white/40 blur-2xl dark:bg-cyan-200/10"
        />
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
