/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.jsx"
  ],
  theme: {
    extend: {
      colors: {
        'biru-1': '#0093DD'
      },
      backgroundImage: {
        'foto-bps': "url('/images/bpssby.jpg')"
      }
    },
  },
  plugins: [],
}

