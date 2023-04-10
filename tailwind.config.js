/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
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
      blue: {
        100: '#F3FAFE',
        200: '#B0D4E7',
        300: '#72AAC8',
        400: '#4887A8',
        500: '#2B6A8B',
        600: '#165678',
        700: '#084261',
        800: '#023149',
        900: '#001D2D',
      },
      red: {
        100: '#F8E0E0',
        200: '#D68C8C',
        300: '#BE5A5A',
        400: '#AF3E3E',
        500: '#952727',
        600: '#791717',
        700: '#5C1010',
        800: '#3C0A0A',
        900: '#180404',
      },

      yellow: {
        100: '#FFF8E9',
        200: '#FFE5B2',
        300: '#FFDB96',
        400: '#FFCD6D',
        500: '#FCBF49',
        600: '#C8973A',
        700: '#9D762A',
        800: '#564116',
        900: '#1E1607',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-manrope)'],
      },
    },
  },
};
