import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Button from '@/components/Button';

describe('Button Component', () => {
	afterEach(() => cleanup());

	it('should correctly render button', async () => {
		render(<Button>Test</Button>);
		const button = screen.getByText('Test');

		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute('type', 'button');
	});

	it('should able button with href', async () => {
		const link = '#test';

		render(<Button href={link}>Test</Button>, { wrapper: BrowserRouter });
		const button = screen.getByText('Test');

		expect(button).toBeInTheDocument();

		await userEvent.click(button);

		expect(window.location.hash).toBe(link);
	});
});
