/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        aqua: {
          50: "#eafcff",
          100: "#c7f5ff",
          200: "#8eeaff",
          300: "#4cd6ff",
          400: "#1abdf5",
          500: "#089fd6",
          600: "#067fae",
          700: "#08628a",
          800: "#0a4d6e",
          900: "#0a3f5a",
        },
        bubble: {
          light: "rgba(255,255,255,0.55)",
          mid: "rgba(180, 230, 255, 0.35)",
          deep: "rgba(60, 160, 220, 0.25)",
        },
        glass: {
          surface: "rgba(255,255,255,0.18)",
          border: "rgba(255,255,255,0.35)",
          deep: "rgba(10, 60, 100, 0.25)",
        },
      },
      fontFamily: {
        display: ["Inter", "Segoe UI", "system-ui", "sans-serif"],
        body: ["Inter", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "aero-sky":
          "radial-gradient(at 20% 10%, #c8f0ff 0%, transparent 50%), radial-gradient(at 80% 0%, #b1f4e0 0%, transparent 55%), radial-gradient(at 50% 100%, #79d6ff 0%, transparent 60%), linear-gradient(180deg, #cde9ff 0%, #7bcfff 55%, #2aa1d6 100%)",
        "aero-sky-dark":
          "radial-gradient(at 20% 10%, #103b58 0%, transparent 55%), radial-gradient(at 80% 0%, #0e4a4a 0%, transparent 50%), radial-gradient(at 50% 100%, #052235 0%, transparent 60%), linear-gradient(180deg, #06182a 0%, #062a44 60%, #021420 100%)",
        "glass-shine":
          "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 35%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0.25) 100%)",
        "bubble-grad":
          "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 25%, rgba(180,230,255,0.18) 55%, rgba(80,160,220,0.05) 80%, transparent 100%)",
      },
      boxShadow: {
        glass:
          "0 8px 32px 0 rgba(31, 88, 135, 0.25), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 1px rgba(255,255,255,0.1)",
        glassHover:
          "0 18px 50px 0 rgba(10, 80, 140, 0.35), inset 0 1px 0 rgba(255,255,255,0.7), 0 0 0 1px rgba(255,255,255,0.4)",
        aquaGlow:
          "0 0 28px rgba(76, 214, 255, 0.55), 0 0 60px rgba(76, 214, 255, 0.25)",
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        floatSlow: "float 14s ease-in-out infinite",
        drift: "drift 22s linear infinite",
        bob: "bob 4.5s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
        ripple: "ripple 1.8s ease-out forwards",
        spinSlow: "spin 40s linear infinite",
        pulseGlow: "pulseGlow 3.5s ease-in-out infinite",
        gradientShift: "gradientShift 18s ease infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-22px) translateX(8px)" },
        },
        drift: {
          "0%": { transform: "translateX(-10%)" },
          "100%": { transform: "translateX(110%)" },
        },
        bob: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.6" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 18px rgba(76,214,255,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(76,214,255,0.9)" },
        },
        gradientShift: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
