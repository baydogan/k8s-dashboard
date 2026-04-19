import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Industrial terminal palette — driven by CSS variables for theme switching
        bg: {
          DEFAULT: "rgb(var(--color-bg) / <alpha-value>)",
          raised: "rgb(var(--color-bg-raised) / <alpha-value>)",
          sunken: "rgb(var(--color-bg-sunken) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--color-border) / <alpha-value>)",
          strong: "rgb(var(--color-border-strong) / <alpha-value>)",
        },
        text: {
          DEFAULT: "rgb(var(--color-text) / <alpha-value>)",
          muted: "rgb(var(--color-text-muted) / <alpha-value>)",
          dim: "rgb(var(--color-text-dim) / <alpha-value>)",
        },
        // Semantic accents
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          warn: "rgb(var(--color-accent-warn) / <alpha-value>)",
          crit: "rgb(var(--color-accent-crit) / <alpha-value>)",
          info: "rgb(var(--color-accent-info) / <alpha-value>)",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
        display: ["IBM Plex Mono", "JetBrains Mono", "monospace"],
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        scan: "scan 8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(0.9)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
