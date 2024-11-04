const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bitcoin: {
          light: '#FFA726',  // Laranja Bitcoin mais claro
          DEFAULT: '#F7931A', // Laranja Bitcoin padrão
          dark: '#E88A16',    // Laranja Bitcoin mais escuro
        },
        neutral: {
          50: '#FFFFFF',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-bitcoin': 'linear-gradient(to right, #F7931A, #FFA726)',
      },
      boxShadow: {
        'bitcoin': '0 4px 14px 0 rgba(247, 147, 26, 0.39)',
      },
    },
  },
  plugins: [],
} 