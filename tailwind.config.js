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
				shine: {
					"0%": { "background-position": "200% center" },
					"100%": { "background-position": "-200% center" },
				},
				"shiny-pulse": {
					"0%, 100%": { opacity: 0.5 },
					"50%": { opacity: 1 },
				},
			},
			animation: {
				"appearing-card": "appear .3s ease-in-out forwards",
				"shiny-pulse": "shine 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				shine: "shine .5s infinite linear",
			},
			backgroundImage: (theme) => ({
				"shine-effect":
					"linear-gradient(90deg, transparent 40%, #e0e0e0 50%, transparent 60%)",
			}),
			backgroundSize: {
				"200%": "200% 100%",
			},
			boxShadow: {
				custom:
					"0 14px 30px rgba(103,132,187,.15),0 4px 4px rgba(103,132,187,.1)",
			},
		},
	},
	plugins: [],
};
