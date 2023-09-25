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
			backgroundColor: {
				genre: "#eff6ff",
			},
			fontSize: {
				xxs: ".65rem",
			},
			color: {
				genre: "#eff6ff",
			},
		},
	},
	daisyui: {
		themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: "dark", // name of one of the included themes for dark mode
		base: false, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
		prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
	},
	plugins: [require("daisyui")],
};
