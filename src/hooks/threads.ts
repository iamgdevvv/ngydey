import { useCallback, useEffect, useMemo, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { slugify } from '@/helper/react-utils';
import { rtkQueryLoading } from '@/helper/redux-utils';
import {
	useLazyGetThreadQuery,
	useLazyGetThreadsQuery,
	usePostDownVoteCommentMutation,
	usePostDownVoteThreadMutation,
	usePostNeutralizeVoteCommentMutation,
	usePostNeutralizeVoteThreadMutation,
	usePostUpVoteCommentMutation,
	usePostUpVoteThreadMutation,
} from '@/redux/apis/forumApi';
import { PayloadVoteComment, PayloadVoteThread } from '@/schema/thread';

const useResThread = (ideaId: string) => {
	const [triggerThread, resultThread] = useLazyGetThreadQuery();

	const isLoadingThread = useMemo(() => {
		return rtkQueryLoading(resultThread);
	}, [resultThread]);

	const handleTriggerThread = useCallback(() => {
		if (ideaId) {
			triggerThread(
				{
					id: ideaId,
				},
				false
			);
		}
	}, [triggerThread, ideaId]);

	useEffect(() => {
		handleTriggerThread();
	}, [handleTriggerThread]);

	const dataThread = useMemo((): Thread | null => {
		if (isLoadingThread || resultThread.isError) {
			return null;
		}

		return resultThread.data?.data.detailThread || null;
	}, [isLoadingThread, resultThread]);

	return { isLoadingThread, dataThread, resultThread, handleTriggerThread, triggerThread };
};

const useResThreads = (category: string) => {
	const [titleCategory, setTitleCategory] = useState('Ideas');
	const [triggerTreads, resultsThreads] = useLazyGetThreadsQuery();

	const isLoadingThreads = useMemo(() => {
		return rtkQueryLoading(resultsThreads);
	}, [resultsThreads]);

	useEffect(() => {
		triggerTreads();
	}, [triggerTreads]);

	const dataThreads = useMemo(() => {
		if (isLoadingThreads || resultsThreads.isError) {
			return [];
		}

		const threads = resultsThreads.data?.data?.threads || [];

		if (threads.length < 1) {
			return [];
		} else if (!category) {
			return threads;
		}

		const threadsByCategory = threads.filter((thread) => {
			const slugCategory = slugify(thread.category);

			if (slugCategory === category) {
				setTitleCategory(thread.category);
				return true;
			}

			return false;
		});

		return threadsByCategory;
	}, [isLoadingThreads, resultsThreads, category]);

	return {
		isLoadingThreads,
		titleCategory,
		dataThreads,
		resultsThreads,
		triggerTreads,
	};
};

const useReqUpVoteThread = () => {
	const [triggerUpVote, resultUpVote] = usePostUpVoteThreadMutation();

	const isLoadingUpVote = useMemo(() => {
		return rtkQueryLoading(resultUpVote);
	}, [resultUpVote]);

	const handleTriggerUpVote = useCallback(
		async ({ threadId }: PayloadVoteThread) => {
			await triggerUpVote({
				threadId,
			});
		},
		[triggerUpVote]
	);

	const dataUpVote = useMemo(() => {
		if (isLoadingUpVote || resultUpVote.isError) {
			return null;
		}

		return resultUpVote.data?.data.vote || null;
	}, [isLoadingUpVote, resultUpVote]);

	useEffect(() => {
		if (resultUpVote.isSuccess || resultUpVote.isError) {
			notifications.show({
				title: resultUpVote.data?.status,
				message: resultUpVote.data?.message,
				color: resultUpVote.isSuccess ? 'blue' : 'red',
			});
		}

		return () => {
			notifications.clean();
		};
	}, [resultUpVote]);

	return {
		isLoadingUpVote,
		dataUpVote,
		resultUpVote,
		triggerUpVote,
		handleTriggerUpVote,
	};
};

const useReqDownVoteThread = () => {
	const [triggerDownVote, resultDownVote] = usePostDownVoteThreadMutation();

	const isLoadingDownVote = useMemo(() => {
		return rtkQueryLoading(resultDownVote);
	}, [resultDownVote]);

	const handleTriggerDownVote = useCallback(
		async ({ threadId }: PayloadVoteThread) => {
			await triggerDownVote({
				threadId,
			});
		},
		[triggerDownVote]
	);

	const dataDownVote = useMemo(() => {
		if (isLoadingDownVote || resultDownVote.isError) {
			return null;
		}

		return resultDownVote.data?.data.vote || null;
	}, [isLoadingDownVote, resultDownVote]);

	useEffect(() => {
		if (resultDownVote.isSuccess || resultDownVote.isError) {
			notifications.show({
				title: resultDownVote.data?.status,
				message: resultDownVote.data?.message,
				color: resultDownVote.isSuccess ? 'blue' : 'red',
			});
		}

		return () => {
			notifications.clean();
		};
	}, [resultDownVote]);

	return {
		isLoadingDownVote,
		dataDownVote,
		resultDownVote,
		triggerDownVote,
		handleTriggerDownVote,
	};
};

const useReqNeutralizeVoteThread = () => {
	const [triggerNeutralizeVote, resultNeutralizeVote] = usePostNeutralizeVoteThreadMutation();

	const isLoadingNeutralizeVote = useMemo(() => {
		return rtkQueryLoading(resultNeutralizeVote);
	}, [resultNeutralizeVote]);

	const handleTriggerNeutralizeVote = useCallback(
		async ({ threadId }: PayloadVoteThread) => {
			await triggerNeutralizeVote({
				threadId,
			});
		},
		[triggerNeutralizeVote]
	);

	const dataDownVote = useMemo(() => {
		if (isLoadingNeutralizeVote || resultNeutralizeVote.isError) {
			return null;
		}

		return resultNeutralizeVote.data?.data.vote || null;
	}, [isLoadingNeutralizeVote, resultNeutralizeVote]);

	useEffect(() => {
		if (resultNeutralizeVote.isSuccess || resultNeutralizeVote.isError) {
			notifications.show({
				title: resultNeutralizeVote.data?.status,
				message: resultNeutralizeVote.data?.message,
				color: resultNeutralizeVote.isSuccess ? 'blue' : 'red',
			});
		}

		return () => {
			notifications.clean();
		};
	}, [resultNeutralizeVote]);

	return {
		isLoadingNeutralizeVote,
		dataDownVote,
		resultNeutralizeVote,
		triggerNeutralizeVote,
		handleTriggerNeutralizeVote,
	};
};

const useReqUpVoteComment = () => {
	const [triggerUpVote, resultUpVote] = usePostUpVoteCommentMutation();

	const isLoadingUpVote = useMemo(() => {
		return rtkQueryLoading(resultUpVote);
	}, [resultUpVote]);

	const handleTriggerUpVote = useCallback(
		async ({ threadId, commentId }: PayloadVoteComment) => {
			await triggerUpVote({
				threadId,
				commentId,
			});
		},
		[triggerUpVote]
	);

	const dataUpVote = useMemo(() => {
		if (isLoadingUpVote || resultUpVote.isError) {
			return null;
		}

		return resultUpVote.data?.data.vote || null;
	}, [isLoadingUpVote, resultUpVote]);

	useEffect(() => {
		if (resultUpVote.isSuccess || resultUpVote.isError) {
			notifications.show({
				title: resultUpVote.data?.status,
				message: resultUpVote.data?.message,
				color: resultUpVote.isSuccess ? 'blue' : 'red',
			});
		}

		return () => {
			notifications.clean();
		};
	}, [resultUpVote]);

	return {
		isLoadingUpVote,
		dataUpVote,
		resultUpVote,
		triggerUpVote,
		handleTriggerUpVote,
	};
};

const useReqDownVoteComment = () => {
	const [triggerDownVote, resultDownVote] = usePostDownVoteCommentMutation();

	const isLoadingDownVote = useMemo(() => {
		return rtkQueryLoading(resultDownVote);
	}, [resultDownVote]);

	const handleTriggerDownVote = useCallback(
		async ({ threadId, commentId }: PayloadVoteComment) => {
			await triggerDownVote({
				threadId,
				commentId,
			});
		},
		[triggerDownVote]
	);

	const dataDownVote = useMemo(() => {
		if (isLoadingDownVote || resultDownVote.isError) {
			return null;
		}

		return resultDownVote.data?.data.vote || null;
	}, [isLoadingDownVote, resultDownVote]);

	useEffect(() => {
		if (resultDownVote.isSuccess || resultDownVote.isError) {
			notifications.show({
				title: resultDownVote.data?.status,
				message: resultDownVote.data?.message,
				color: resultDownVote.isSuccess ? 'blue' : 'red',
			});
		}

		return () => {
			notifications.clean();
		};
	}, [resultDownVote]);

	return {
		isLoadingDownVote,
		dataDownVote,
		resultDownVote,
		triggerDownVote,
		handleTriggerDownVote,
	};
};

const useReqNeutralizeVoteComment = () => {
	const [triggerNeutralizeVote, resultNeutralizeVote] = usePostNeutralizeVoteCommentMutation();

	const isLoadingNeutralizeVote = useMemo(() => {
		return rtkQueryLoading(resultNeutralizeVote);
	}, [resultNeutralizeVote]);

	const handleTriggerNeutralizeVote = useCallback(
		async ({ threadId, commentId }: PayloadVoteComment) => {
			await triggerNeutralizeVote({
				threadId,
				commentId,
			});
		},
		[triggerNeutralizeVote]
	);

	const dataDownVote = useMemo(() => {
		if (isLoadingNeutralizeVote || resultNeutralizeVote.isError) {
			return null;
		}

		return resultNeutralizeVote.data?.data.vote || null;
	}, [isLoadingNeutralizeVote, resultNeutralizeVote]);

	useEffect(() => {
		if (resultNeutralizeVote.isSuccess || resultNeutralizeVote.isError) {
			notifications.show({
				title: resultNeutralizeVote.data?.status,
				message: resultNeutralizeVote.data?.message,
				color: resultNeutralizeVote.isSuccess ? 'blue' : 'red',
			});
		}

		return () => {
			notifications.clean();
		};
	}, [resultNeutralizeVote]);

	return {
		isLoadingNeutralizeVote,
		dataDownVote,
		resultNeutralizeVote,
		triggerNeutralizeVote,
		handleTriggerNeutralizeVote,
	};
};

export {
	useResThread,
	useResThreads,
	useReqUpVoteThread,
	useReqDownVoteThread,
	useReqNeutralizeVoteThread,
	useReqUpVoteComment,
	useReqDownVoteComment,
	useReqNeutralizeVoteComment,
};
