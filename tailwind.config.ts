import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        porcelain: "var(--porcelain)",
        blush: "var(--blush)",
        rose: "var(--rose)",
        "rose-deep": "var(--rose-deep)",
        ink: "var(--ink)",
        muted: "var(--muted)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Cormorant Garamond", "serif"],
      },
      fontSize: {
        "xs": "clamp(0.75rem, 0.8vw, 0.75rem)",   // 12px
        "sm": "clamp(0.875rem, 0.9vw, 0.875rem)", // 14px
        "base": "clamp(1rem, 1vw, 1rem)",         // 16px
        "lg": "clamp(1.25rem, 1.2vw, 1.25rem)",   // 20px
        "xl": "clamp(1.75rem, 1.8vw, 1.75rem)",   // 28px
        "2xl": "clamp(2.5rem, 2.5vw, 2.5rem)",    // 40px
        "3xl": "clamp(4rem, 4vw, 4rem)",          // 64px
        "4xl": "clamp(5.5rem, 5.5vw, 5.5rem)",    // 88px
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
};

export default config;
