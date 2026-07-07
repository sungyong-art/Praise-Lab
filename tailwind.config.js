/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        roseGold: {
          50: '#FAF4F2',
          100: '#F5E7E4',
          200: '#EBD1CB',
          300: '#DCB2A7',
          400: '#CD9283',
          500: '#BD7564', // Main Rose Gold
          600: '#A95847',
          700: '#8C4436',
          800: '#6F3429',
          900: '#4E2118',
        },
        warmAmber: {
          50: '#FDF8F0',
          100: '#FAF0DE',
          200: '#F2DCB4',
          300: '#EBC487',
          400: '#E2A955',
          500: '#D98A29', // Main Warm Amber
          600: '#B66A1D',
          700: '#945116',
          800: '#723A10',
          900: '#4E250A',
        }
      },
      fontFamily: {
        sans: ['"Space Mono"', 'monospace'],
        serif: ['"Space Mono"', 'monospace'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
