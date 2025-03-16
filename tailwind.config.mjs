import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Atkinson", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xs: "0.85rem",    // ~13.6px
        sm: "0.95rem",    // ~15.2px
        base: "1.0625rem", // ~17px
        lg: "1.17rem",    // ~18.7px
        xl: "1.275rem",   // ~20.4px
        "2xl": "1.6rem",  // ~25.6px
        "3xl": "1.9rem",  // ~30.4px
        "4xl": "2.55rem", // ~40.8px
        "5xl": "3.2rem",  // ~51.2px
        "6xl": "3.825rem", // ~61.2px
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "full",
          },
        },
      },
      spacing: {
        '28': '7rem',
      },
      rotate: {
        45: "45deg",
        135: "135deg",
        225: "225deg",
        315: "315deg",
      },
      animation: {
        twinkle: "twinkle 2s ease-in-out forwards",
        meteor: "meteor 3s ease-in-out forwards",
        "pulse-slow": "pulseGlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spinSlow 8s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "bounce-slow": "bounce 3s infinite",
        "shimmer": "shimmer 2s linear infinite",
        float: 'float 3s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        twinkle: {
          "0%": {
            opacity: 0,
            transform: "rotate(0deg)",
          },
          "50%": {
            opacity: 1,
            transform: "rotate(180deg)",
          },
          "100%": {
            opacity: 0,
            transform: "rotate(360deg)",
          },
        },
        meteor: {
          "0%": {
            opacity: 0,
            transform: "translateY(200%)",
          },
          "50%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
            transform: "translateY(0)",
          },
        },
        pulseGlow: {
          "0%, 100%": {
            opacity: 0.6,
            transform: "scale(1)",
          },
          "50%": {
            opacity: 0.8,
            transform: "scale(1.05)",
          },
        },
        spinSlow: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0",
          },
          "100%": {
            backgroundPosition: "200% 0",
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'gradient-angular': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-diamond': 'conic-gradient(from 45deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-blue': '0 0 15px 2px rgba(59, 130, 246, 0.3)',
        'glow-indigo': '0 0 15px 2px rgba(99, 102, 241, 0.3)',
        'glow-violet': '0 0 15px 2px rgba(139, 92, 246, 0.3)',
        'inner-glow': 'inset 0 0 10px 0 rgba(255, 255, 255, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  purge: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
};
