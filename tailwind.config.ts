import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0D1821",   // Deep Rich Black (Background)
        secondary: "#F0F4EF", // Ghost White (Text/Accents)
        accent: "#E63946",    // Muted Red
      },
      fontFamily: {
        // This maps 'font-heading' to Bebas Neue
        heading: ["var(--font-bebas)"],
        // This maps 'font-sans' to Inter
        sans: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
export default config;