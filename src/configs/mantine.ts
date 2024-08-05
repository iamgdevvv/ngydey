import { Input, createTheme } from '@mantine/core';

const mantineTheme = createTheme({
	fontFamily:
		'Plus Jakarta Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
	components: {
		InputWrapper: Input.Wrapper.extend({
			defaultProps: {
				inputWrapperOrder: ['label', 'input', 'description'],
			},
		}),
	},
});

export default mantineTheme;
