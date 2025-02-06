import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      spacing: {
        xs: "0.5rem", // 8px
        sm: "1rem", // 16px
        md: "1.5rem", // 24px
        lg: "2rem", // 32px
        xl: "2.5rem", // 40px
        "2xl": "3rem", // 48px
      },
      borderRadius: {
        xs: "0.25rem", // 4px
        sm: "0.5rem", // 8px
        md: "0.75rem", // 12px
        lg: "1rem", // 16px
        xl: "1.25rem", // 20px
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
