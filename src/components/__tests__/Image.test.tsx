import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Image from '@/components/Image';

describe('Image Component', () => {
	afterEach(() => cleanup());

	it('should correctly render image', async () => {
		const props = {
			src: 'https://source.unsplash.com/random',
			alt: 'test',
		}
		render(<Image {...props} />);
		const image = screen.getByAltText(props.alt);

		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', props.src);
		expect(image).toHaveAttribute('alt', props.alt);
	});

	it('should able image with href', async () => {
		const props = {
			src: 'https://source.unsplash.com/random',
			alt: 'test',
			href: '#test',
		}

		render(<Image {...props} />, { wrapper: BrowserRouter });
		const image = screen.getByAltText(props.alt);

		expect(image).toBeInTheDocument();
		expect(image.parentElement).toBeInTheDocument();

		await userEvent.click(image.parentElement!);

		expect(window.location.hash).toBe(props.href);
	});
});
