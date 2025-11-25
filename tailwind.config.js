/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        'bg-main': '#050505',
        'bg-surface': '#0F0F0F',
        'text-main': '#F5F5F5',
        'text-muted': '#B3B3B3',
        'primary': '#F5B400', // Amarelo Dourado para destaque
        'border-subtle': 'rgba(255,255,255,0.05)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          xl: '1280px',
          '2xl': '1400px',
        },
      }
    },
  },
  plugins: [],
}