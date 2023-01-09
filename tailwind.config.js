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
        'productCard' : 'width, height, transform',
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
          '0%': { transform: 'translateY(400%)', opacity: '0' },
          '100%': { transform: 'translateY(0%)', opacity: '1' },
        },
        textTransition2: {
          '0%': { transform: 'translateY(30%)', opacity: '0' },
          '50%': { transform: 'translateY(30%)', opacity: '0' },
          '100%': { transform: 'translateY(0%)' },
        },
        imageTransition: {
          '0%': { transform: 'scale(0.5)' },
          '100%': { transform: 'scale(1)' },
        },
        starBackground: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.5)' },
        },
        
      },
      animation: {
        slidein: 'slidein 1.2s',
        hideImage: 'hideImage 1.9s',
        hideNavBarContent: 'hideNavBarContent 1.2s',
        hideBlueBorder: 'hideBlueBorder 0.6s',
        textTransition: 'textTransition 2.2s',
        textTransition2: 'textTransition2 0.8s',
        imageTransition: 'imageTransition 2.6s',
        starBackground: 'starBackground 10s alternate infinite',
      }
    },
  },
  plugins: [],
};
