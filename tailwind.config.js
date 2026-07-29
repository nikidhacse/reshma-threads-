/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pearl: {
          DEFAULT: '#FAF8F5',
          light: '#FFFFFF',
          dark: '#F3EFEA',
        },
        sand: {
          light: '#FAF6F0',
          DEFAULT: '#F5EFE6',
          dark: '#E6DCB8',
        },
        gold: {
          light: '#E6C887',
          DEFAULT: '#C5A059',
          dark: '#9E7E3B',
          accent: '#D4AF37',
          glow: 'rgba(197, 160, 89, 0.25)',
        },
        brown: {
          light: '#A88B70',
          DEFAULT: '#8C6D53',
          dark: '#5C4431',
        },
        ebony: {
          light: '#333333',
          DEFAULT: '#1A1A1A',
          soft: '#262626',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(26, 26, 26, 0.07)',
        'gold-glow': '0 10px 30px -5px rgba(197, 160, 89, 0.3)',
        'card-hover': '0 25px 50px -12px rgba(140, 109, 83, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
