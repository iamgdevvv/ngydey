import { MantineProvider } from '@mantine/core';
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Message from '@/components/Message';

describe('Message Component', () => {
	afterEach(() => cleanup());

	it('should correctly render message', async () => {
		render(<Message state='error'>test</Message>, { wrapper: MantineProvider });
		const message = screen.getByText('test');

		expect(message).toBeInTheDocument();
	});

	it('should not render message', async () => {
		const { container } = render(
			<Message
				show={false}
				state='error'
			>
				test
			</Message>
		);

		expect(container).toBeEmptyDOMElement();
	});
});
