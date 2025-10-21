/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'abyss-black': '#0f111a',
        'main-bg': '#1a1d2e',
        'card-bg': '#2d3250',
        'card-darker': '#424769',
        'primary-blue': '#4f7cff',
        'highlight-blue': '#5b8def',
        'soft-blue': '#7aa2f7',
        'text-primary': '#e1e7f5',
        'text-secondary': '#c4d0ed',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
