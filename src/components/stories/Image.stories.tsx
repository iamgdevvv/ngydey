import type { Meta, StoryObj } from '@storybook/react';
import Image from '@/components/Image';

const meta = {
	title: 'Components/Image',
	component: Image,
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		src: 'https://source.unsplash.com/random',
	},
};
