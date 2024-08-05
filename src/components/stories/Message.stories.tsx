import type { Meta, StoryObj } from '@storybook/react';
import Message from '@/components/Message';

const meta = {
	title: 'Components/Message',
	component: Message,
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		state: 'error',
		children: 'Error',
	},
};
