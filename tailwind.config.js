/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': {
          primary: '#080A0D',
          surface: '#0D1117',
          elevated: '#121820',
        },
        'text': {
          primary: '#F5F7FA',
          secondary: '#8B949E',
          muted: '#4B5563',
        },
        'accent': {
          bullish: '#39FF88',
          bearish: '#FF4D5F',
        },
        'ui': {
          border: 'rgba(255, 255, 255, 0.06)',
          'border-hover': 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
  },
  plugins: [],
};
