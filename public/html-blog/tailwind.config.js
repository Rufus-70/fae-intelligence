/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{html,js}',
    './includes/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00ACC1',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#2C2C2C',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#1A237E',
          foreground: '#FFFFFF',
        },
        background: '#FFFFFF',
        foreground: '#2C2C2C',
        muted: {
          DEFAULT: '#ECEFF1',
          foreground: '#546E7A',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#2C2C2C',
        },
        border: '#E5E7EB',
        'fae': {
          'teal': '#00ACC1',
          'gray-light': '#ECEFF1',
          'gray-dark': '#2C2C2C',
          'blue-dark': '#1A237E',
        },
        'cyan': {
          500: '#00ACC1',
          600: '#0097A7',
        },
        'slate': {
          700: '#334155',
          900: '#0f172a',
        },
        'gray': {
          50: '#f9fafb',
          100: '#f3f4f6',
          300: '#d1d5db',
          600: '#4b5563',
          700: '#374151',
          900: '#111827',
        },
        'white': '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      fontSize: {
        '5xl': ['3rem', { lineHeight: '1' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
      },
    },
  },
  plugins: [],
}
