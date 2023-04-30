/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './base/**/*.{js,ts,jsx,tsx}',
  ],
  mode: 'jit',
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
        dark: '#F63053',
        light: '#FAEDEF',
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
        'op-0': 'rgba(17, 17, 17, 0)',
        'op-20': 'rgba(17, 17, 17, 0.2)',
      },
      yellow: {
        dark: '#F4CE65',
        light: '#FDF7E7',
      },
    },
    extend: {
      animation: {
        'backdrop-filter-animation-in':
          'backdrop-filter-in 250ms ease-in forwards',
        'backdrop-filter-animation-out':
          'backdrop-filter-out 250ms ease-in forwards',
        'opacity-animation-down': 'opacity-down 250ms ease-in forwards',
        'opacity-animation-up': 'opacity-up 250ms ease-in forwards',
      },
      fontFamily: {
        sans: ['var(--font-manrope)'],
      },
      keyframes: {
        'backdrop-filter-in': {
          '0%': { 'backdrop-filter': 'blur(0px)' },
          '100%': { 'backdrop-filter': 'blur(8px)' },
        },
        'backdrop-filter-out': {
          '0%': { 'backdrop-filter': 'blur(8px)' },
          '100%': { 'backdrop-filter': 'blur(0px)' },
        },
        'opacity-down': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        'opacity-up': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      transitionDelay: {
        250: '250ms',
      },
      transitionProperty: {
        display: 'display',
        transform: 'transform',
      },
    },
    translate: {
      'full-left': '-100%',
    },
  },
};
