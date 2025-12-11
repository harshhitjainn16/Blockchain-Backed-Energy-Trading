/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdecd3',
          200: '#fad6a5',
          300: '#f7b96d',
          400: '#f39333',
          500: '#f0770b',
          600: '#e15b01',
          700: '#ba4304',
          800: '#94350a',
          900: '#782d0b',
        },
      },
    },
  },
  plugins: [],
}
