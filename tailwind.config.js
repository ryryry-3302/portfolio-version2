const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./mdx-components.tsx",
		"content/**/*.mdx",
	],

	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						"code::before": {
							content: '""',
						},
						"code::after": {
							content: '""',
						},
					},
				},
				quoteless: {
					css: {
						"blockquote p:first-of-type::before": { content: "none" },
						"blockquote p:first-of-type::after": { content: "none" },
					},
				},
			},
			fontFamily: {
				sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
				display: ["var(--font-calsans)"],
				pixel: ["'Press Start 2P'", "cursive"],
			},
			backgroundImage: {
				"gradient-radial":
					"radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops))",
				"gradient-mesh":
					"linear-gradient(135deg, #3b82f6 0%, #06b6d4 25%, #f97316 50%, #3b82f6 75%, #06b6d4 100%)",
				"pokemon-gradient": "linear-gradient(180deg, #3B4CCA 0%, #24329A 100%)",
			},
			colors: {
				glass: {
					DEFAULT: "rgba(139, 92, 246, 0.1)",
					light: "rgba(139, 92, 246, 0.2)",
					dark: "rgba(109, 40, 217, 0.3)",
				},
				gamecube: {
					purple: "#6A5ACD",
					indigo: "#483D8B",
					dark: "#1a0d2e",
					medium: "#2d1b4e",
					light: "#a78bfa",
					silver: "#C0C0C0",
				},
				pokemon: {
					red: "#FF3333",
					blue: "#4D70E0",
					yellow: "#FFDE00",
					gold: "#B3A125",
					green: "#4DAD5B",
					darkblue: "#24329A",
					cream: "#fcfcfa",
				},
			},
			backdropBlur: {
				xs: "2px",
			},
			animation: {
				"fade-in": "fade-in 3s ease-in-out forwards",
				title: "title 3s ease-out forwards",
				"fade-left": "fade-left 3s ease-in-out forwards",
				"fade-right": "fade-right 3s ease-in-out forwards",
				"gradient-shift": "gradient-shift 8s ease infinite",
				"slide-up": "slide-up 0.5s ease-out forwards",
				"slide-in-left": "slide-in-left 0.5s ease-out forwards",
				"pixel-bounce": "pixel-bounce 1s steps(2) infinite",
				"typewriter": "typewriter 2s steps(40) forwards",
				"blink": "blink 1s step-end infinite",
			},
			keyframes: {
				"pixel-bounce": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-4px)" },
				},
				"typewriter": {
					from: { width: "0" },
					to: { width: "100%" },
				},
				"blink": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0" },
				},
				"fade-in": {
					"0%": {
						opacity: "0%",
					},
					"75%": {
						opacity: "0%",
					},
					"100%": {
						opacity: "100%",
					},
				},
				"fade-left": {
					"0%": {
						transform: "translateX(100%)",
						opacity: "0%",
					},

					"30%": {
						transform: "translateX(0%)",
						opacity: "100%",
					},
					"100%": {
						opacity: "0%",
					},
				},
				"fade-right": {
					"0%": {
						transform: "translateX(-100%)",
						opacity: "0%",
					},

					"30%": {
						transform: "translateX(0%)",
						opacity: "100%",
					},
					"100%": {
						opacity: "0%",
					},
				},
				title: {
					"0%": {
						"line-height": "0%",
						"letter-spacing": "0.25em",
						opacity: "0",
					},
					"25%": {
						"line-height": "0%",
						opacity: "0%",
					},
					"80%": {
						opacity: "100%",
					},

					"100%": {
						"line-height": "100%",
						opacity: "100%",
					},
				},
				"gradient-shift": {
					"0%, 100%": {
						"background-position": "0% 50%",
					},
					"50%": {
						"background-position": "100% 50%",
					},
				},
				"slide-up": {
					"0%": {
						transform: "translateY(20px)",
						opacity: "0",
					},
					"100%": {
						transform: "translateY(0)",
						opacity: "1",
					},
				},
				"slide-in-left": {
					"0%": {
						transform: "translateX(-20px)",
						opacity: "0",
					},
					"100%": {
						transform: "translateX(0)",
						opacity: "1",
					},
				},
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwindcss-debug-screens"),
	],
};
