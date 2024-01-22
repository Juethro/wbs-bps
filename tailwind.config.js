/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.jsx"
  ],
  theme: {
    extend: {
      colors: {
        'biru-1': '#0093DD',
        'biru-2': '#002B6A'
      },
      backgroundImage: {
        'foto-bps': "url('/images/bpssby.jpg')"
      }
    },
  },
  plugins: [],
}

