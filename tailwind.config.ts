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
        coral: {
          DEFAULT: "#E84E59",
          hover: "#D43D48",
          dark: "#B82E39",
          soft: "#FDF2F3",
          border: "#F7D1D4",
        },
        ochre: {
          DEFAULT: "#C89B3C",
          hover: "#B6882E",
          soft: "#FBF5EA",
          border: "#EDDFBF",
        },
        sand: {
          DEFAULT: "#F7EFE2",
          light: "#F9F5EE",
          dark: "#EFE3D0",
          border: "#E9DEC9",
        },
        forest: {
          DEFAULT: "#173F32",
          dark: "#0F2A22",
          deep: "#0B211B",
          light: "#285C48",
          subtle: "#EDF3F0",
        },
        gold: {
          DEFAULT: "#C8A96B",
          light: "#E3D3B1",
          soft: "#F6F1E7",
          dark: "#A68648",
          deep: "#846731",
        },
        ivory: {
          DEFAULT: "#FBF9F5",
          light: "#FFFFFF",
          dark: "#F4EFE6",
          border: "#E9DEC9",
        },
        charcoal: {
          DEFAULT: "#202923",
          light: "#3E4942",
          muted: "#757E78",
          subtle: "#A3AAA4",
        },
      },
      spacing: {
        '18': '4.5rem',
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'soft-xs': '0 1px 3px rgba(32, 41, 35, 0.04)',
        'soft-sm': '0 2px 8px -2px rgba(32, 41, 35, 0.06), 0 1px 4px -1px rgba(32, 41, 35, 0.03)',
        'soft': '0 8px 24px -4px rgba(32, 41, 35, 0.07), 0 4px 12px -2px rgba(32, 41, 35, 0.03)',
        'soft-lg': '0 16px 36px -6px rgba(32, 41, 35, 0.10), 0 8px 20px -4px rgba(32, 41, 35, 0.05)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
export default config;
