// If you want to use other PostCSS plugins, see the following:
// https://tailwindcss.com/docs/using-with-preprocessors

/** @type {import('tailwindcss').Config} */
const config = require('tailwind-config/tailwind.config.js');

module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    // Specifying the config is not necessary in most cases, but it is included
    // here to share the same config across the entire monorepo
    tailwindcss: { config },
    autoprefixer: {}
  }
};
