// eslint-disable-next-line @typescript-eslint/no-var-requires
const { mauve, violet } = require("@radix-ui/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...mauve,
        ...violet,
      },
    },
  },

  important: true, // important in prod is must be
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    require("daisyui"),
  ],
  darkMode: "class",
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
  },
};
