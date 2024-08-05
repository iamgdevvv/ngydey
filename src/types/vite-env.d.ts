/// <reference types="vite/client" />

type User = {
	id: string;
	name: string;
	email: string;
	avatar: string;
};

type UserThread = {
	id: string;
	name: string;
	avatar: string;
};

type DownVote = {
	id: string;
	userId: string;
	commentId: string;
	voteType: -1;
};

type UpVote = {
	id: string;
	userId: string;
	commentId: string;
	voteType: 1;
};

type ItemComment = {
	id: string;
	content: string;
	createdAt: string;
	owner: UserThread;
	upVotesBy: string[];
	downVotesBy: string[];
};

type ItemThreads = {
	id: string;
	title: string;
	body: string;
	category: string;
	createdAt: string;
	ownerId: string;
	upVotesBy: string[];
	downVotesBy: string[];
	totalComments: number;
};

type ItemLeaderboards = {
	user: User;
	score: number;
};

type Thread = {
	id: string;
	title: string;
	body: string;
	category: string;
	createdAt: string;
	owner: UserThread;
	upVotesBy: string[];
	downVotesBy: string[];
	comments: ItemComment[];
};
