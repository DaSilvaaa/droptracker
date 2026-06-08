import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        acid: "#e8ff00",
        obsidian: "#080808",
        carbon: "#111111",
        zinc: {
          DEFAULT: "#1a1a1a",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
        border: "#1a1a1a",
        input: "#1a1a1a",
        ring: "#e8ff00",
        background: "#080808",
        foreground: "#fafafa",
        primary: {
          DEFAULT: "#e8ff00",
          foreground: "#080808",
        },
        secondary: {
          DEFAULT: "#1a1a1a",
          foreground: "#fafafa",
        },
        destructive: {
          DEFAULT: "#ff4444",
          foreground: "#fafafa",
        },
        muted: {
          DEFAULT: "#1a1a1a",
          foreground: "#71717a",
        },
        accent: {
          DEFAULT: "#e8ff00",
          foreground: "#080808",
        },
        popover: {
          DEFAULT: "#111111",
          foreground: "#fafafa",
        },
        card: {
          DEFAULT: "#111111",
          foreground: "#fafafa",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "slide-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
