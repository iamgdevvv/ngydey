/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					mantine: [
						'@mantine/core',
						'@mantine/dates',
						'@mantine/form',
						'@mantine/hooks',
						'@mantine/modals',
						'@mantine/notifications',
						'@mantine/nprogress',
						'mantine-form-zod-resolver',
					],
					mantine_tiptap: ['@mantine/tiptap'],
					vendors: ['dayjs', 'react-icons', 'zod'],
					reduxs: ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
				},
			},
		},
		cssCodeSplit: false,
		cssMinify: true,
	},
	plugins: [react()],
	test: {
		environment: 'jsdom',
		setupFiles: 'src/setup-tests.ts',
		include: ['src/**/__tests__/*'],
		pool: 'forks',
		mockReset: true,
	},
});
