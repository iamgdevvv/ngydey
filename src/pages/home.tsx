/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '@/helper/react-utils';
import { rtkQueryLoading } from '@/helper/redux-utils';
import { useResThreads } from '@/hooks/threads';
import { useResLeaderborads } from '@/hooks/users';
import AccountBox from '@/layouts/AccountBox';
import ListingCategory from '@/layouts/categories/ListingCategory';
import ListingLeaderboard from '@/layouts/leaderboards/ListingLeaderboard';
import ListingThread from '@/layouts/threads/ListingThread';

export default function HomePage() {
	const { dataThreads, resultsThreads } = useResThreads('');
	const { dataLeaderboards, resultsLeaderboards } = useResLeaderborads();

	const isLoadingThreads = useMemo(() => {
		return rtkQueryLoading(resultsThreads);
	}, [resultsThreads]);

	const isLoadingLeaderborads = useMemo(() => {
		return rtkQueryLoading(resultsLeaderboards);
	}, [resultsLeaderboards]);

	const dataCategories = useMemo((): Category[] => {
		if (!dataThreads || dataThreads.length < 0) {
			return [];
		}

		const categories: any = {};

		dataThreads.forEach((thread) => {
			const slugCategory = slugify(thread.category);

			const category: Category = categories[slugCategory] || {};

			if (category?.slug) {
				category.count = (category.count || 0) + 1;
			} else {
				category.title = thread.category;
				category.slug = slugCategory;
				category.count = 1;
			}

			categories[category.slug] = category;
		});

		return Object.values(categories);
	}, [dataThreads]);

	return (
		<>
			<AccountBox />
			<main className='site-main'>
				<section className='mb-[48px]'>
					<h2>Popular Tags</h2>
					<ListingCategory
						data={dataCategories}
						loading={isLoadingThreads}
						className='mb-[40px]'
					/>
				</section>
				<section className='mb-[48px]'>
					<h1>
						Find the{' '}
						<Link
							to='/ideas'
							className='text-cyan-400'
						>
							Ideas
						</Link>
					</h1>
					<ListingThread
						data={dataThreads.length > 3 ? dataThreads.slice(0, 3) : dataThreads}
						loading={isLoadingThreads}
					/>
				</section>
				<section className='mb-[48px]'>
					<h2>
						See{' '}
						<Link
							to='/leaderboards'
							className='text-cyan-400'
						>
							Leaderboard
						</Link>
					</h2>
					<ListingLeaderboard
						data={dataLeaderboards.length > 3 ? dataLeaderboards.slice(0, 3) : dataLeaderboards}
						loading={isLoadingLeaderborads}
					/>
				</section>
			</main>
		</>
	);
}
