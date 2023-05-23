/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  important: true, // important in prod is must be
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: ['light', 'dark'],
    base: true,
    utils: true,
  },
};
