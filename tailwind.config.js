/** @type {import('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '128': '32rem',
      },
      colors: {
        'picton-blue': '#48AAE7',
        'cornflower-blue': '#A6D3EA',
        'cyber-yellow': '#FDD300',
        'han-purple': '#491DEF',
        customBlue: '#48AAE7',
        customWhite: '#FFFFFF',
        customLightBlue: '#A6D3EA',
        customDarkGray: '#333333',
      },
          backgroundImage: {
        'gym': "url('./assets/images/gymsection.jpg')",
        'cases': "url('./assets/images/casessection.jpg')",
        'jewelry': "url('./assets/images/jewelsection.jpg')",
        'cases-gallery': "url('./assets/images/cases.jpg')",
    },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Fuente Poppins para un estilo juvenil     
      },
    },
  },
  plugins: [
    scrollbar
  ],
};
