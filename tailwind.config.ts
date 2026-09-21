import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        // Semantic tokens backed by CSS variables so the whole site can flip
        // between light and dark via the `.dark` class on <html>.
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        mist: "rgb(var(--c-mist) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        subtle: "rgb(var(--c-subtle) / <alpha-value>)",
        accent: {
          DEFAULT: "#0071e3",
          dark: "#0059b3",
        },
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
