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
        dark: '#050505',
      },
      blue: {
        dark: '#6578F1',
        light: '#E8EBFC',
      },
      gray: {
        dark: '#B3B3B3',
        light: '#F3F3F3',
      },
      green: {
        dark: '#6FDEAA',
        light: '#E6FCF2',
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
        'op-20': 'rgba(17, 17, 17, 0.2)',
      },
      yellow: {
        dark: '#F4CE65',
        light: '#FDF7E7',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-manrope)'],
      },
      transitionProperty: {
        backdrop: 'backdrop-filter',
      },
    },
    translate: {
      'full-left': '-100%',
    },
  },
};
