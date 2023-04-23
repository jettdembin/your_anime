/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			keyframes: {
				appear: {
					"0%": { opacity: "0", scale: 10 },
					"100%": { opacity: "100", scale: 100 },
				},
			},
			animation: {
				"appearing-card": "appear .3s ease-in-out forwards",
			},
		},
	},
	plugins: [],
};
