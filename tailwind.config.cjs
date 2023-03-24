/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#ECEFF4",
          secondary: "#D8DEE9",
          accent: "#88C0D0",
          text: "#2E3440",
        },
        dark: {
          primary: "#2E3440",
          secondary: "#3B4252",
          accent: "#81A1C1",
          text: "#ECEFF4",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
