import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Minimalist black and white color scheme
        dark: {
          bg: '#0F0F0F', // Nearly black background
          paper: '#161616', // Slightly lighter than bg for cards
          surface: '#1C1C1C', // Subtle distinction for surfaces
          'surface-variant': '#242424', // Hover states and variants
          primary: '#FFFFFF', // Pure white for primary elements
          secondary: '#A0A0A0', // Light gray for secondary elements
          accent: '#FFFFFF', // White for accent (focused minimalism)
          error: '#CF6679', // Keeping error color for required notifications
          'on-bg': '#FFFFFF', // White text on dark backgrounds
          'on-surface': '#FFFFFF', // White text on surfaces
          'on-primary': '#000000', // Black text on white elements
          'on-secondary': '#000000000', // Black text on secondary elements
          'on-error': '#000000', // Black text on error elements
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter var', 'system-ui', 'sans-serif'],
        mono: ['Fira Code VF', 'monospace'],
        serif: ['Georgia', 'serif'],
      },
      fontSize: {
        '2xs': '0.625rem', // 10px
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3.2rem', // ~51.2px
        '6xl': '3.825rem', // ~61.2px

        // Responsive font sizes using clamp
        'fluid-xs': 'clamp(0.75rem, calc(0.7rem + 0.15vw), 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, calc(0.8rem + 0.2vw), 1rem)',
        'fluid-base': 'clamp(1rem, calc(0.95rem + 0.25vw), 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, calc(1rem + 0.5vw), 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, calc(1.1rem + 0.75vw), 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, calc(1.3rem + 1vw), 1.875rem)',
        'fluid-3xl': 'clamp(1.875rem, calc(1.5rem + 1.5vw), 2.25rem)',
        'fluid-4xl': 'clamp(2.25rem, calc(1.8rem + 2.25vw), 3rem)',
        'fluid-5xl': 'clamp(3rem, calc(2.3rem + 3.5vw), 4rem)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'full',
            color: 'inherit',
            a: {
              'text-decoration': 'none',
              'font-weight': '500',
            },
            'h1, h2, h3, h4, h5, h6': {
              'font-weight': '700',
              'font-family': 'var(--font-display)',
              'line-height': '1.2',
            },
            code: {
              'font-weight': '500',
              'font-family': 'var(--font-mono)',
              'background-color': 'var(--tw-prose-pre-bg)',
              'border-radius': '0.25rem',
              padding: '0.125rem 0.25rem',
            },
          },
        },
      },
      spacing: {
        28: '7rem',
      },
      rotate: {
        45: '45deg',
        135: '135deg',
        225: '225deg',
        315: '315deg',
      },
      animation: {
        twinkle: 'twinkle 2s ease-in-out forwards',
        meteor: 'meteor 3s ease-in-out forwards',
        'pulse-slow': 'pulseGlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spinSlow 8s linear infinite',
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        wave: 'wave 2s infinite',
        fadeIn: 'fadeIn 1s ease-out both',
        slideUpFade: 'slideUpFade 1s ease-out both',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'gradient-conic-to-br':
          'conic-gradient(at bottom right, var(--tw-gradient-stops))',
        'gradient-hero':
          'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': {
            opacity: 0.2,
          },
          '50%': {
            opacity: 1,
          },
        },
        meteor: {
          '0%': {
            transform: 'rotate(215deg) translateX(0)',
            opacity: 1,
          },
          '70%': {
            opacity: 1,
          },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: 0,
          },
        },
        pulseGlow: {
          '0%, 100%': {
            opacity: 0.6,
            transform: 'scale(1)',
          },
          '50%': {
            opacity: 0.8,
            transform: 'scale(1.05)',
          },
        },
        spinSlow: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
        wave: {
          '0%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(20deg)',
          },
          '50%': {
            transform: 'rotate(0deg)',
          },
          '75%': {
            transform: 'rotate(15deg)',
          },
        },
        fadeIn: {
          from: {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        slideUpFade: {
          from: {
            opacity: 0,
            transform: 'translateY(40px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
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
  plugins: [typography],
};
