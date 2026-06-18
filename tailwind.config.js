/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff2f8',
          100: '#d6dff0',
          200: '#acc7e1',
          300: '#7aa6cf',
          400: '#4e83ba',
          500: '#2d65a1',
          600: '#234f85',
          700: '#1c3f6b',
          800: '#163358',
          900: '#091541',
          950: '#060d2a',
        },
        accent: {
          50: '#fff0f0',
          100: '#ffdcdc',
          200: '#ffb9b9',
          300: '#ff8787',
          400: '#ff4747',
          500: '#ff1a1a',
          600: '#f30f0f',
          700: '#d00b00',
          800: '#b10c06',
          900: '#8f0f0b',
          950: '#500404',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
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
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
