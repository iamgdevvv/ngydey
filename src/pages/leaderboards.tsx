import { useEffect, useMemo } from 'react';
import { useLazyGetLeaderboardsQuery } from '@/redux/apis/forumApi';
import AccountBox from '@/layouts/AccountBox';
import ListingLeaderboard from '@/layouts/leaderboards/ListingLeaderboard';
import Navigation from '@/layouts/Navigation';

export default function LeaderboardsPage() {
	const [triggerLeaderborads, resultsLeaderborads] = useLazyGetLeaderboardsQuery();

	useEffect(() => {
		triggerLeaderborads();
	}, [triggerLeaderborads]);

	const dataLeaderborads = useMemo(
		() => resultsLeaderborads.data?.data?.leaderboards || [],
		[resultsLeaderborads.data]
	);

	return (
		<>
			<Navigation className='capitalize !mb-0'>Leaderboards</Navigation>
			<AccountBox />
			<main className='site-main'>
				<ListingLeaderboard data={dataLeaderborads} />
			</main>
		</>
	);
}
