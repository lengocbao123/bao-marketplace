const colors = require('tailwindcss/colors');
const themes = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`src/**/*.{js,ts,jsx,tsx}`],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem'
      },
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
        12.5: '3.125rem' /* 50px */,
        15: '3.75rem' /* 60px */,
        16.5: '4rem' /* 66px */,
        17.5: '4.375rem' /* 70px */,
        18: '4.5rem' /* 72px */,
        22.5: '5.625rem' /* 90px */,
        24.5: '6.125rem' /* 98px */,
        25: '6.25rem' /* 100px */,
        26: '6.5rem' /* 104px */,
        35: '8.75rem' /* 140px */,
        41: '10.25rem' /* 164px */,
        50: '12.5rem' /* 200px */,
        56: '14rem' /* 224px */,
        60: '15rem' /* 240px */,
        67: '16.75rem' /* 268px */
      },
      borderWidth: {
        3: '3px'
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(61.1deg, #f6f6f6 -18.33%, #916ff2 20.35%, #4a20b0 60.96%, #2f107c 105.78%)',
        'gradient-2': 'linear-gradient(65.39deg, #da22ff -2.14%, #6e43d4 100.21%)',
        'hero-overlay': 'linear-gradient(180deg, #ffffff 14.51%, rgba(255, 255, 255, 0) 100%)'
      },
      boxShadow: {
        dropdown: ['0px 0px 2px rgba(0, 0, 0, 0.2)', '0px 2px 10px rgba(10, 6, 34, 0.1)'],
        'line-down': '0px 1px 0px rgba(10, 6, 34, 0.05)',
        'line-up': '0px -1px 0px rgba(10, 6, 34, 0.05)',
        'line-right': '1px 0px 0px rgba(10, 6, 34, 0.05)',
        'box-hover': '0px 4px 14px rgba(10, 6, 34, 0.12)',
        'box-pressed': ['0px 1px 10px rgba(0, 0, 0, 0.1)', '0px 2px 4px rgba(10, 6, 34, 0.08)'],
        'box-inner': ['inset 0 -2px 4px 0 rgba(0, 0, 0, 0.05)', 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)']
      },
      animation: {
        'hero-small': 'hero-small 50s linear infinite',
        'hero-large': 'hero-large 60s linear infinite'
      },
      keyframes: {
        'hero-small': {
          '0%': { transform: `translateY(-${((2642 - 874) / 2642) * 100}%)` },
          '100%': { transform: 'translateY(0)' }
        },
        'hero-large': {
          '100%': { transform: `translateY(-${((2834 - 938) / 2834) * 100}%)` }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp'), require('@tailwindcss/forms')]
};
