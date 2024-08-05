/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';
import tailwindScroll from 'tailwind-scrollbar';

export default {
	content: ['./src/**/*.{jsx,tsx}'],
	theme: {
		extend: {
			screens: {
				sm: { min: '600px' },
				md: { min: '900px' },
				lg: { min: '1280px' },
				xl: { min: '1600px' },
				'<sm': { max: '699px' },
				'<md': { max: '899px' },
				'<lg': { max: '1279px' },
				'<xl': { max: '1599px' },
			},
			fontFamily: {
				sans: [
					'Plus Jakarta Sans',
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'Noto Sans',
					'sans-serif',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol',
					'Noto Color Emoji',
				],
			},
			fontSize: {
				base: '14px',
			},
		},
		transitionTimingFunction: {
			DEFAULT: 'linear',
		},
		transitionduration: {
			DEFAULT: '200ms',
		},
	},
	plugins: [tailwindScroll({ nocompatible: true })],
} satisfies Config;
