import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import type { Preview } from '@storybook/react';
import mantineTheme from '../src/configs/mantine';
import store from '../src/redux/store';
import '../src/styles/base.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		(Story) => (
			<MemoryRouter>
				<MantineProvider theme={mantineTheme}>
					<Provider store={store}>
						<Story />
					</Provider>
				</MantineProvider>
			</MemoryRouter>
		),
	],
};

export default preview;
