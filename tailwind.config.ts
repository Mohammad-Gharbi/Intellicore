import type { Config } from "tailwindcss"

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pulseDots: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.95)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        fadeDown: {
          "0%": { opacity: "0", transform: "translateY(-40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-dots": "pulseDots 2s ease-in-out infinite",
        "fade-down": "fadeDown 1s ease-out forwards",
      },
    },
  },
} satisfies Config
