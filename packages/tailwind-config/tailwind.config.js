const colors = require('tailwindcss/colors');
const themes = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`src/**/*.{js,ts,jsx,tsx}`],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: colors.blue[500],
          red: colors.red[500]
        },
        primary: {
          DEFAULT: '#c1e64c',
          50: '#9bc919',
          30: '#d0f066',
          20: '#f2fbcc',
          5: '#fafee7'
        },
        secondary: {
          DEFAULT: '#6e43d4',
          70: '#5a2fbf',
          40: '#9a8bee',
          30: '#b1acf5',
          10: '#e4e3fc'
        },
        neutral: {
          DEFAULT: '#1f1f23',
          70: '#1f1f23',
          50: '#7c7d89',
          30: '#cbcbd5',
          10: '#eeeff0',
          0: '#fff'
        },
        accent: {
          success: '#6dbc00',
          warning: '#ffc42d',
          error: '#eb5849',
          info: '#4663e2'
        },
        bg: {
          warning: '#fff4c6',
          error: '#fee4e2',
          info: '#d9ebff'
        }
      },
      extend: {
        fontFamily: {
          sans: ['Work Sans', ...themes.fontFamily.sans]
        },
        spacing: {
          0.75: '0.1875rem' /* 3px */,
          1.25: '0.3125rem' /* 5px */,
          1.75: '0.4375rem' /* 7px */,
          2.25: '0.5625rem' /* 9px */,
          2.75: '0.6875rem' /* 11px */,
          3.75: '0.9375rem' /* 15px */,
          4.5: '1.125rem' /* 18px */,
          7.5: '1.875rem' /* 30px */,
          7.75: '1.9375rem' /* 31px */,
          16.5: '4rem' /* 66px */,
          17.5: '4.375rem' /* 70px */,
          24.5: '6.125rem' /* 98px */,
          25: '6.25rem' /* 100px */,
          26: '6.5rem' /* 104px */,
          35: '8.75rem' /* 140px */,
          41: '10.25rem' /* 164px */,
          56: '14rem' /* 224px */,
          60: '15rem' /* 240px */,
          67: '16.75rem' /* 268px */
        },
        borderWidth: {
          3: '3px'
        },
        backgroundImage: {
          'gradient-1': 'linear-gradient(61.1deg, #f6f6f6 -18.33%, #916ff2 20.35%, #4a20b0 60.96%, #2f107c 105.78%)'
        },
        boxShadow: {
          dropdown: ['0px 0px 2px rgba(0, 0, 0, 0.2)', '0px 2px 10px rgba(10, 6, 34, 0.1)'],
          'line-down': '0px 1px 0px rgba(10, 6, 34, 0.05)',
          'line-up': '0px -1px 0px rgba(10, 6, 34, 0.05)',
          'line-right': '1px 0px 0px rgba(10, 6, 34, 0.05)',
          'box-hover': '0px 4px 14px rgba(10, 6, 34, 0.12)',
          'box-pressed': ['0px 1px 10px rgba(0, 0, 0, 0.1)', '0px 2px 4px rgba(10, 6, 34, 0.08)'],
          'box-inner': ['inset 0 -2px 4px 0 rgba(0, 0, 0, 0.05)', 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)']
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp')]
};
