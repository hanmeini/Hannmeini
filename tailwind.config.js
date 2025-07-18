/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        float: "float 3s ease-in-out infinite",
        'blink': 'blink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'border-spin': 'border-spin 7s linear infinite',
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        'blink': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        'border-spin': {
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      fontFamily: {
        manrope: ['var(--font-manrope)'],
        sans: ['var(--font-satoshi)', 'sans-serif'], 
        display: ['var(--font-playfair)', 'serif'],
        asgard: ['var(--font-asgard)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
