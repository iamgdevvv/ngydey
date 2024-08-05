import { z } from 'zod';

const CommentSchema = z.object({
	content: z.string(),
});

const ThreadSchema = z.object({
	title: z.string(),
	body: z.string(),
	category: z.string().optional(),
});

type PayloadComment = z.infer<typeof CommentSchema>;

type PayloadThread = z.infer<typeof ThreadSchema>;

type PayloadCreateThread = PayloadThread;

type PayloadCreateComment = {
	content: string;
	threadId: string;
};

type PayloadVoteThread = {
	threadId: string;
};

type PayloadVoteComment = {
	threadId: string;
	commentId: string;
};

export { CommentSchema, ThreadSchema };
export type {
	PayloadCreateComment,
	PayloadVoteThread,
	PayloadVoteComment,
	PayloadCreateThread,
	PayloadComment,
	PayloadThread,
};
