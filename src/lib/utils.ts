import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function prettyName(slug: string) {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\bIti\b/gi, "ITI")
    .replace(/\bIeee\b/gi, "IEEE")
    .replace(/\bOop\b/gi, "OOP")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    });
  } catch {
    return iso;
  }
}

// Deterministic pseudo-random number from string seed — used for stable layout.
export function seededRand(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 10000) / 10000;
  };
}

export const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C#": "#178600",
  Python: "#3572A5",
  Java: "#b07219",
  Vue: "#41b883",
  Shell: "#89e051",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  C: "#555555",
  "C++": "#f34b7d",
  SCSS: "#c6538c",
};

export function langColor(lang?: string | null) {
  if (!lang) return "#7bd6ff";
  return LANG_COLORS[lang] ?? "#7bd6ff";
}
