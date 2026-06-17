import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#241317", // texto escuro / vinho-preto
        wine: "#5a1226", // bordô base
        winedeep: "#3a0c18",
        red: "#a02236", // vermelho marcante
        ember: "#a02236",
        gold: "#b5872f", // dourado para fundos claros
        golddark: "#8c6420",
        cream: "#f4ede0", // bege
        paper: "#f8f4ed", // fundo claro das páginas
        line: "#e6ddcf", // bordas suaves
        haze: "#8a7d72", // texto secundário em fundo claro
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "1rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(36,19,23,0.04), 0 12px 32px -16px rgba(36,19,23,0.18)",
        lift: "0 20px 50px -24px rgba(36,19,23,0.35)",
      },
      maxWidth: {
        container: "80rem",
      },
      transitionTimingFunction: {
        horizonte: "cubic-bezier(0.7, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
