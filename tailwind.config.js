/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./script.js"
  ],
  theme: {
    extend: {
      colors: {
        offwhite: '#FAFAFA',
        luxury: {
          gold: '#D4AF37',
          champagne: '#C5A059',
          charcoal: '#222222',
          onyx: '#1A1A1A',
          'rose-gold': {
            light: '#F5DCD0',
            DEFAULT: '#D4AF37', // A cor dourada principal, mas com toque Rose Gold/Champagne
            medium: '#C5A059',
            dark: '#8C6239'
          }
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 8px 32px 0 rgba(34, 34, 34, 0.04)',
        'luxury-hover': '0 20px 40px -10px rgba(197, 160, 89, 0.12)',
      },
      backgroundImage: {
        'luxury-radial': 'radial-gradient(circle at 50% 50%, #ffffff 0%, #fafafa 100%)',
      }
    },
  },
  plugins: [],
}
