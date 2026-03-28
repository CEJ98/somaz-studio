import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0d0d0d",
        paper: "#fafaf8",
        cream: "#f2ede4",
        gold: "#c4a45a",
        "gold-light": "#d4b878",
        muted: "#6b6b6b",
        border: "#e0dbd0",
      },
      fontFamily: {
        heading: ["'Cormorant Garamond'", "Georgia", "serif"],
        body: ["'Inter'", "var(--font-geist-sans)", "Arial", "sans-serif"],
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "0.9" }],
        "11xl": ["12rem", { lineHeight: "0.85" }],
      },
      letterSpacing: {
        widest: "0.3em",
        "extra-wide": "0.2em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
