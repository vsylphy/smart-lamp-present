import { defineConfig } from "windicss/helpers";

export default defineConfig({
  darkMode: "class",

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  safelist: ["animate-bubble", "animate-glow"],

  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
      },

      colors: {
        primary: "#4f46e5",
        secondary: "#06b6d4",
      },

      keyframes: {
        // Floating items
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },

        // Glow animation
        glow: {
          "0%, 100%": {
            filter: "drop-shadow(0 0 0 currentColor)",
          },
          "50%": {
            filter: "drop-shadow(0 0 20px currentColor)",
          },
        },

        // Bubble animation
        bubble: {
          "0%": { transform: "translateY(0) scale(0.4)", opacity: "0" },
          "50%": { opacity: "0.7" },
          "100%": { transform: "translateY(-200px) scale(1)", opacity: "0" },
        },
      },

      animation: {
        float: "float 4s ease-in-out infinite",
        glow: "glow 2.5s ease-in-out infinite",
        bubble: "bubble 6s linear infinite",
      },
    },
  },

  plugins: [],
});
