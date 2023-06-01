/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: true, // important in prod is must be
  plugins: [require('daisyui'), require('tailwindcss-animate')],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
  },
};
