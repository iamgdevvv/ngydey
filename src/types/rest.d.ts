/// <reference types="vite/client" />

type ResError = {
	status: IState;
	message: string;
};

type ResLogin = {
	status: IState;
	message: string;
	data: {
		token: string;
	};
};

type ResRegister = {
	status: IState;
	message: string;
	data: {
		user: User;
	};
};

type ResUser = {
	status: IState;
	message: string;
	data: {
		user: User;
	};
};

type ResUsers = {
	status: IState;
	message: string;
	data: {
		users: User[];
	};
};

type PayloadUser = {
	token: string;
};

type ResThreads = {
	status: IState;
	message: string;
	data: {
		threads: ItemThreads[];
	};
};

type ResThread = {
	status: IState;
	message: string;
	data: {
		detailThread: Thread;
	};
};

type ResCreateThread = {
	status: IState;
	message: string;
	data: {
		thread: Thread;
	};
};

type ResComment = {
	status: IState;
	message: string;
	data: {
		comment: ItemComment;
	};
};

type UpVote = 1;
type DownVote = -1;
type NeutralizeVote = 0;

type ResVoteThread<TypeVote> = {
	status: IState;
	message: string;
	data: {
		vote: {
			id: string;
			userId: string;
			threadId: string;
			voteType: TypeVote;
		};
	};
};

type ResVoteComment<TypeVote> = {
	status: IState;
	message: string;
	data: {
		vote: {
			id: string;
			userId: string;
			commentId: string;
			voteType: TypeVote;
		};
	};
};

type ResLeaderboards = {
	status: IState;
	message: string;
	data: {
		leaderboards: ItemLeaderboards[];
	};
};
