import { useEffect, useMemo } from 'react';
import { rtkQueryLoading } from '@/helper/redux-utils';
import { useLazyGetLeaderboardsQuery, useLazyGetUsersQuery } from '@/redux/apis/forumApi';

const useResUsers = () => {
	const [triggerUsers, resultsUsers] = useLazyGetUsersQuery();

	const isLoadingUsers = useMemo(() => {
		return rtkQueryLoading(resultsUsers);
	}, [resultsUsers]);

	useEffect(() => {
		triggerUsers();
	}, [triggerUsers]);

	const dataUsers = useMemo(() => {
		if (isLoadingUsers || resultsUsers.isError) {
			return [];
		}

		return resultsUsers.data?.data?.users || [];
	}, [isLoadingUsers, resultsUsers]);

	return {
		isLoadingUsers,
		dataUsers,
		resultsUsers,
		triggerUsers,
	};
};

const useResLeaderborads = () => {
	const [triggerLeaderboards, resultsLeaderboards] = useLazyGetLeaderboardsQuery();

	const isLoadingLeaderboards = useMemo(() => {
		return rtkQueryLoading(resultsLeaderboards);
	}, [resultsLeaderboards]);

	useEffect(() => {
		triggerLeaderboards();
	}, [triggerLeaderboards]);

	const dataLeaderboards = useMemo(() => {
		if (isLoadingLeaderboards || resultsLeaderboards.isError) {
			return [];
		}

		return resultsLeaderboards.data?.data?.leaderboards || [];
	}, [isLoadingLeaderboards, resultsLeaderboards]);

	return {
		isLoadingLeaderboards,
		dataLeaderboards,
		resultsLeaderboards,
		triggerLeaderboards,
	};
};

export { useResUsers, useResLeaderborads };
