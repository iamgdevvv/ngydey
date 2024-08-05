import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@mantine/core';
import { useLazyGetThreadsQuery } from '@/redux/apis/forumApi';
import { useResUsers } from '@/hooks/users';
import Navigation from '@/layouts/Navigation';
import { rtkQueryLoading } from '@/helper/redux-utils';
import ListingThread from '@/layouts/threads/ListingThread';

export default function DetailUserPage() {
	const { userId } = useParams();
	const { dataUsers, resultsUsers } = useResUsers();
	const [triggerTreads, resultsThreads] = useLazyGetThreadsQuery();

	const isLoading = useMemo(() => {
		return rtkQueryLoading(resultsUsers) || rtkQueryLoading(resultsThreads);
	}, [resultsUsers, resultsThreads]);

	const dataUser = useMemo((): User | undefined => {
		if (!userId || dataUsers.length < 1) {
			return undefined;
		}

		return dataUsers.find((user) => user.id === userId);
	}, [userId, dataUsers]);

	useEffect(() => {
		if (dataUser) {
			triggerTreads();
		}
	}, [triggerTreads, dataUser]);

	const dataThreads = useMemo(() => {
		if (!dataUser) {
			return [];
		}

		const threads = resultsThreads.data?.data?.threads || [];

		if (threads.length < 1) {
			return threads;
		}

		const threadsByOwner = threads.filter((thread) => thread.ownerId === userId);

		return threadsByOwner;
	}, [resultsThreads.data, dataUser, userId]);

	if (isLoading) {
		return (
			<>
				<Navigation className='capitalize'>
					<Skeleton
						height={24}
						width='50%'
						radius='xl'
					/>
				</Navigation>
				<main className='site-main'>
					<Skeleton
						height={8}
						radius='xl'
					/>
					<Skeleton
						height={8}
						mt={6}
						radius='xl'
					/>
					<Skeleton
						height={8}
						mt={6}
						width='70%'
						radius='xl'
					/>
				</main>
			</>
		);
	}

	return (
		<>
			<Navigation className='capitalize'>{dataUser?.name || 'User'}</Navigation>
			<main className='site-main'>
				<ListingThread
					data={dataThreads}
					loading={isLoading}
				/>
			</main>
		</>
	);
}
