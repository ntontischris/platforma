/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cyber-dark': {
          DEFAULT: 'var(--cyber-dark)',
          50: 'rgba(10, 10, 31, 0.05)',
          100: 'rgba(10, 10, 31, 0.1)',
          200: 'rgba(10, 10, 31, 0.2)',
          300: 'rgba(10, 10, 31, 0.3)',
          400: 'rgba(10, 10, 31, 0.4)',
          500: 'rgba(10, 10, 31, 0.5)',
          600: 'rgba(10, 10, 31, 0.6)',
          700: 'rgba(10, 10, 31, 0.7)',
          800: 'rgba(10, 10, 31, 0.8)',
          900: 'rgba(10, 10, 31, 0.9)',
        },
        neon: {
          primary: {
            DEFAULT: '#0ff',
            50: 'rgba(0, 255, 255, 0.05)',
            100: 'rgba(0, 255, 255, 0.1)',
            200: 'rgba(0, 255, 255, 0.2)',
            300: 'rgba(0, 255, 255, 0.3)',
            400: 'rgba(0, 255, 255, 0.4)',
            500: 'rgba(0, 255, 255, 0.5)',
            600: 'rgba(0, 255, 255, 0.6)',
            700: 'rgba(0, 255, 255, 0.7)',
            800: 'rgba(0, 255, 255, 0.8)',
            900: 'rgba(0, 255, 255, 0.9)',
          },
          secondary: {
            DEFAULT: '#f0f',
            50: 'rgba(255, 0, 255, 0.05)',
            100: 'rgba(255, 0, 255, 0.1)',
            200: 'rgba(255, 0, 255, 0.2)',
            300: 'rgba(255, 0, 255, 0.3)',
            400: 'rgba(255, 0, 255, 0.4)',
            500: 'rgba(255, 0, 255, 0.5)',
            600: 'rgba(255, 0, 255, 0.6)',
            700: 'rgba(255, 0, 255, 0.7)',
            800: 'rgba(255, 0, 255, 0.8)',
            900: 'rgba(255, 0, 255, 0.9)',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 5px var(--neon-primary), 0 0 20px var(--neon-primary)',
        'neon-lg': '0 0 10px var(--neon-primary), 0 0 30px var(--neon-primary)',
        'neon-xl': '0 0 15px var(--neon-primary), 0 0 40px var(--neon-primary)',
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'neon-glow': 'neon-glow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'neon-glow': {
          '0%': {
            textShadow: '0 0 5px var(--neon-primary), 0 0 10px var(--neon-primary)',
          },
          '100%': {
            textShadow: '0 0 10px var(--neon-primary), 0 0 20px var(--neon-primary), 0 0 30px var(--neon-primary)',
          },
        },
      },
    },
  },
  plugins: [],
}