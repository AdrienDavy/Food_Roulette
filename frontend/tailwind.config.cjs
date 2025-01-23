/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        "slide-x": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(200%)",
          },
        },
        "slide-y": {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(200%)",
          },
        },
        particle: {
          "0%": {
            transform: "scale(1)",
            opacity: 1,
          },
          "100%": {
            transform: "scale(0) translate(50px, 0)",
            opacity: 0,
          },
        },
        ring: {
          "0%": {
            transform: "scale(0)",
            opacity: 1,
          },
          "100%": {
            transform: "scale(2)",
            opacity: 0,
          },
        },
        vibrate: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(3px)" },
          "75%": { transform: "translateX(-1px)" },
        },
      },
      animation: {
        vibrate: "vibrate 400ms linear forwards",
        'slide-x': 'slide-x 2s linear infinite',
        'slide-y': 'slide-y 2s linear infinite',
        particle: 'particle 0.6s ease-out forwards',
        ring: 'ring 0.6s ease-out forwards',
      },
      colors: {
        primary: {
          DEFAULT: '#00807F',
          hover: '#1FAEAD',
          focus: '#006362',
          dark: '#004D4C', // Couleur pour le thème sombre
          'dark-hover': '#007473', // Variation claire en sombre
          'dark-focus': '#003333', // Variation sombre en sombre
        },
        secondary: {
          DEFAULT: '#F5F5DB',
          hover: '#FFFFF0',
          focus: '#E0E0B9',
          dark: '#BFBF9A', // Couleur pour le thème sombre
          'dark-hover': '#D9D9C4', // Variation claire en sombre
          'dark-focus': '#9A9A7A', // Variation sombre en sombre
        },
        tertiary: {
          DEFAULT: '#FB8071',
          hover: '#FF9B8E',
          focus: '#E66D5E',
          dark: '#C46058', // Couleur pour le thème sombre
          'dark-hover': '#E57C70', // Variation claire en sombre
          'dark-focus': '#9E4C45', // Variation sombre en sombre
        },
        light: {
          DEFAULT: '#FFFFFF',
          hover: '#F7F7F7',
          focus: '#E5E5E5',
          dark: '#1A1A1A', // Noir/gris très sombre pour le thème dark
          'dark-hover': '#333333', // Variation claire en sombre
          'dark-focus': '#0D0D0D', // Variation sombre en sombre
        },
      },
     
    },
  },
  plugins: [],
};
