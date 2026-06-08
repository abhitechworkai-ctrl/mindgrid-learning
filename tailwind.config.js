/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          navy:   '#1A2238',
          orange: '#F26B1D',
          amber:  '#F5A623',
          slate:  '#5B6472',
          cream:  '#FBF4E9',
          light:  '#FDF0E0',
          // legacy alias so existing bg-primary-accent / text-primary-accent → orange
          accent: '#F26B1D',
          // kept for any remaining inline references
          blue:   '#6A89A7',
        },
      },
      lineHeight: {
        'relaxed-body':    '1.5',
        'relaxed-heading': '1.2',
      },
      fontSize: {
        'base': ['16px', { lineHeight: '1.5' }],
        'lg':   ['18px', { lineHeight: '1.5' }],
        'xl':   ['20px', { lineHeight: '1.5' }],
        '2xl':  ['24px', { lineHeight: '1.2' }],
        '3xl':  ['30px', { lineHeight: '1.2' }],
        '4xl':  ['36px', { lineHeight: '1.2' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};
