/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			backgroundColor: {
				primary: "#F1F1F2",
				blur: "#030303",
			},
			colors: {
				primary: "rgb(22, 24, 35)",
			},
			backgroundImage: {
				"blurred-img":
					"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsaaJ7s4lqcBF4IDROVPzrlL5fexcwRmDlnuEYQenWTt1DejFY5kmYDref2a0Hp2eE4aw&usqp=CAU')",
			},
			keyframes: {
				loading: {
					"0%": {
						"-webkit-transform": "translateX(0px)",
						transform: "translateX(0px)",
					},
					"50%": {
						"-webkit-transform": "translateX(10px)",
						transform: "translateX(10px)",
					},
					"100%": {
						"-webkit-transform": "translateX(20px)",
						transform: "translateX(20px)",
					},
				},
			},
			animation: {
				loading: "loading 1s linear infinite",
			},
		},
	},
	plugins: [],
};
