import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      colors: {
        // Main color system - Soft mint & lavender base
        background: {
          light: "#F6FAFB",
          DEFAULT: "#F0F7F7",
          dark: "#EBF2F2",
        },
        // Primary interaction colors - Mint green tones
        primary: {
          light: "#9ED5C5",
          DEFAULT: "#8EC3B0",
          dark: "#7CAE9C",
        },
        // Secondary colors - Soft lavender
        secondary: {
          light: "#BCBCFF",
          DEFAULT: "#A5A5FF",
          dark: "#8F8FFF",
        },
        // Accent colors - Soft pastels
        accent: {
          pink: "#FFD1DA",
          blue: "#BFEAF5",
          yellow: "#FDEEB7",
        },
        // Mood tag colors with new palette
        mood: {
          procrastination: "#FF9494", // Soft red
          focus: "#98D8AA", // Fresh mint
          anxiety: "#FFB4B4", // Soft coral
          energetic: "#94B9FF", // Bright blue
          calm: "#B4B4FF", // Soft purple
        },
      },
    },
  },
  plugins: [],
};

export default config;
