import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand Emerald
        emerald: {
          primary: "#155D40",
          dark: "#103F2E",
          light: "#1E7A54",
          soft: "#EAF3ED",
          muted: "#2D7F5C",
        },
        // Champagne Gold
        gold: {
          DEFAULT: "#C5A46D",
          dark: "#A8884F",
          light: "#D4B88A",
          soft: "#F7F1E6",
          border: "#E8D9BF",
        },
        // Neutrals
        ivory: {
          DEFAULT: "#FBF9F5",
          light: "#FFFFFF",
          dark: "#F5F2EC",
          border: "#EAE7DF",
        },
        // Text
        ink: {
          DEFAULT: "#232A27",
          secondary: "#777D78",
          muted: "#A3A9A4",
          light: "#C8CECA",
        },
        // Legacy compatibility
        forest: {
          DEFAULT: "#155D40",
          dark: "#103F2E",
          deep: "#0B2118",
          light: "#1E7A54",
          subtle: "#EAF3ED",
        },
        charcoal: {
          DEFAULT: "#232A27",
          light: "#3E4942",
          muted: "#777D78",
          subtle: "#A3A9A4",
        },
        coral: {
          DEFAULT: "#E84E59",
          hover: "#D43D48",
          dark: "#B82E39",
          soft: "#FDF2F3",
          border: "#F7D1D4",
        },
        ochre: {
          DEFAULT: "#C5A46D",
          hover: "#A8884F",
          soft: "#F7F1E6",
          border: "#E8D9BF",
        },
        sand: {
          DEFAULT: "#F5F2EC",
          light: "#F9F7F3",
          dark: "#EAE7DF",
          border: "#E0DDD5",
        },
      },

      fontFamily: {
        serif: ["var(--font-heading)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Georgia", "serif"],
      },

      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },

      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },

      boxShadow: {
        "soft-xs": "0 1px 3px rgba(21,93,64,0.05)",
        "soft-sm": "0 2px 10px -2px rgba(21,93,64,0.08), 0 1px 4px -1px rgba(21,93,64,0.04)",
        "soft": "0 8px 28px -4px rgba(21,93,64,0.10), 0 4px 12px -2px rgba(21,93,64,0.05)",
        "soft-lg": "0 16px 48px -8px rgba(21,93,64,0.14), 0 8px 20px -4px rgba(21,93,64,0.06)",
        "gold": "0 8px 32px -4px rgba(197,164,109,0.30)",
        "gold-lg": "0 16px 48px -8px rgba(197,164,109,0.40)",
        "card": "0 2px 12px rgba(21,93,64,0.06), 0 1px 4px rgba(21,93,64,0.04)",
        "card-hover": "0 12px 36px rgba(21,93,64,0.12), 0 4px 16px rgba(21,93,64,0.06)",
      },

      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },

      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4B88A 0%, #C5A46D 60%, #A8884F 100%)",
        "emerald-gradient": "linear-gradient(180deg, #155D40 0%, #103F2E 100%)",
        "gold-shimmer": "linear-gradient(135deg, #E8D5A8 0%, #C5A46D 50%, #A8884F 100%)",
      },

      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        shimmer: "shimmer 1.4s ease infinite",
        "fade-in-up": "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.3s ease forwards",
        "scale-in": "scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },

      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
