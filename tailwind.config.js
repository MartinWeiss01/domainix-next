/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'xs': '425px',
      },
      keyframes: {
        'loading-animation': {
          '0%': {
            top: '36px',
            left: '36px',
            width: '0',
            height: '0',
            opacity: '0'
          },
          '4.9%': {
            top: '36px',
            left: '36px',
            width: '0',
            height: '0',
            opacity: '0'
          },
          '5%': {
            top: '36px',
            left: '36px',
            width: '0',
            height: '0',
            opacity: '1'
          },
          '100%': {
            top: '0px',
            left: '0px',
            width: '72px',
            height: '72px',
            opacity: '0'
          }
        }
      }
    },
    animation: {
      'loading-animation': 'loading-animation 1s cubic-bezier(0, 0.2, 0.8, 1) infinite'
    }
  },
  plugins: [],
}
