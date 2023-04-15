/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './base/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [],
  theme: {
    colors: {
      black: {
        100: '#DCDCDC',
        200: '#B4B4B4',
        300: '#9A9A9A',
        400: '#7F7F7F',
        500: '#636363',
        600: '#474747',
        700: '#333333',
        800: '#1E1E1E',
        900: '#050505',
      },
      orange: {
        dark: '#E68063',
        light: '#E6B4A5',
      },
      red: {
        'op-33': '#F0115133',
        'op-5': '#F011510D',
        primary: '#F01151',
        secondary: '#F53e52',
        tertiary: '#FD6854',
      },
      turquoise: {
        dark: '#4CB0AA',
        light: '#9BC2C0',
      },
      white: {
        full: '#FFF',
        half: '#ffffff80',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-manrope)'],
      },
    },
    translate: {
      'full-left': '-100%',
    },
  },
};
