/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'kid-blue': '#4AA5FF',
        'kid-green': '#4ADE80',
        'kid-yellow': '#FBBF24',
      },
      fontFamily: {
        'comic': ['Comic Neue', 'cursive'],
      },
    },
  },
  plugins: [],
} 