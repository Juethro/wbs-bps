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
        'biru-5': '#0F4C75',
        'biru-6': '#0C3D5F',
        'biru-7': '#3282B8',
        'kuning-1': '#F79633',
        'hijau-1' : '#8FC74A',
        'abu-1': '#EFEFEF',
        'abu-2': '#D9D9D9'
      },
      backgroundImage: {
        'foto-bps': "url('/images/bpssby.jpg')",
        'logo-bps': "url('/images/logobps.png')"
      }
    },
  },
  plugins: [],
}

