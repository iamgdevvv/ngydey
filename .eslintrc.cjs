module.exports = {
	root: true,
	env: { browser: true, es2020: true, node: true, 'cypress/globals': true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:storybook/recommended',
		'plugin:jest/recommended',
	],
	ignorePatterns: ['dist', 'public', 'cypress', 'stories', '.eslintrc.cjs', '*.config.ts'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-hooks', 'react-refresh', 'cypress'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
	},
};
