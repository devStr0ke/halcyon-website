/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'navBar' : 'margin-left, margin-right, border-radius, height'
      },
      keyframes: {
        slidein : {
          '0%': { height: '0.2rem', marginRight: '50rem', marginLeft: '50rem' },
          '50%': { height: '0.2rem' },
          '75%': { height: '0.2rem' },
          '85%': { height: '0.2rem' },
        }
      },
      animation: {
        slidein: 'slidein 1.2s'
      }
    },
  },
  plugins: [],
};
