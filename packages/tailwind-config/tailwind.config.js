const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`src/**/*.{js,ts,jsx,tsx}`],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: colors.blue[500],
          red: colors.red[500]
        }
      }
    }
  },
  plugins: []
};
