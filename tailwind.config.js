// tailwind.config.js
const { mauve, violet } = require("@radix-ui/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{ts,tsx,js,jsx}",
		"./pages/**/*.{ts,tsx,js,jsx}",
		"./components/**/*.{ts,tsx,js,jsx}",
		"./features/**/*.{ts,tsx,js,jsx}",
	],
	theme: {
		extend: {
			colors: {
				...mauve,
				...violet,
				background: "var(--background)",
				foreground: "var(--foreground)",
				primary: "var(--primary)",
				"primary-foreground": "var(--primary-foreground)",
				secondary: "var(--secondary)",
				"secondary-foreground": "var(--secondary-foreground)",
			},
		},
	},
	plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
	darkMode: "class",
};
