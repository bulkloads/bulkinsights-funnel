import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        navy: {
          50: "#f0f4fa",
          100: "#dbe5f1",
          200: "#b7cce4",
          300: "#8aabd0",
          400: "#5a84b7",
          500: "#3d659c",
          600: "#2f4f7e",
          700: "#283f63",
          800: "#1d2e49",
          900: "#131f31",
          950: "#08101c",
        },
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
      },
      backgroundImage: {
        "grid-light":
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(600px circle at 50% 0%, rgba(251,191,36,0.15), transparent 70%)",
      },
    },
  },
  plugins: [],
};
export default config;
