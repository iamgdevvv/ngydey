module.exports = {
	plugins: {
		'tailwindcss/nesting': {},
		tailwindcss: {},
		autoprefixer: {},
		'postcss-preset-mantine': {},
		'postcss-simple-vars': {
			variables: {
				'mantine-breakpoint-xs': '360',
				'mantine-breakpoint-sm': '600',
				'mantine-breakpoint-md': '900',
				'mantine-breakpoint-lg': '1200',
				'mantine-breakpoint-xl': '1600',
			},
		},
	},
};
