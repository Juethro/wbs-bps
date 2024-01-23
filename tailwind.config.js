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
        'biru-2': '#002B6A',
        'biru-3': '#04214A',
        'biru-4': '#071322',
        'kuning-1': '#F79633',
        'hijau-1' : '#8FC74A'
      },
      backgroundImage: {
        'foto-bps': "url('/images/bpssby.jpg')",
        'logo-bps': "url('/images/logobps.png')"
      }
    },
  },
  plugins: [],
}

