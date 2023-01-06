/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'navBar' : 'margin-left, margin-right, border-radius, height',
        'blueBorderLeft' : 'left, right',
      },
      keyframes: {
        slidein : {
          '0%': { height: '0.2rem', marginRight: '50rem', marginLeft: '50rem', display: 'none' },
          '50%': { height: '0.2rem' },
          '75%': { height: '0.2rem' },
          '85%': { height: '0.2rem' },
        },
        hideImage: {
          '0%': { opacity: '0' },
          '50%': { opacity: '0' },
          '95%': { opacity: '1' },
        },
        hideBlueBorder: {
          '0%': { opacity: '0' },
          '50%': { opacity: '0' },
          '95%': { opacity: '1' },
        },
        hideNavBarContent: {
          '0%': { opacity: '0' },
          '50%': { opacity: '0' },
          '95%': { opacity: '1' },
        },
        textTransition: {
          '0%': { transform: 'translateY(50%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        imageTransition: {
          '0%': { transform: 'scale(0.5)' },
          '100%': { transform: 'translateY(1)' },
        },
        
      },
      animation: {
        slidein: 'slidein 1.2s',
        hideImage: 'hideImage 1.9s',
        hideNavBarContent: 'hideNavBarContent 1.2s',
        hideBlueBorder: 'hideBlueBorder 0.6s',
        textTransition: 'textTransition 1.2s',
        imageTransition: 'imageTransition 2.2s',
      }
    },
  },
  plugins: [],
};
