import { useParams } from 'react-router-dom';
import Navigation from '@/layouts/Navigation';
import ListingThread from '@/layouts/threads/ListingThread';
import { useResThreads } from '@/hooks/threads';

export default function IdeasPage() {
	const { ideaCategory } = useParams();
	const { titleCategory, dataThreads, resultsThreads } = useResThreads(ideaCategory || '');

	return (
		<>
			<Navigation className='capitalize'>{titleCategory}</Navigation>
			<main className='site-main'>
				<ListingThread
					data={dataThreads}
					loading={resultsThreads.isLoading}
				/>
			</main>
		</>
	);
}
