import { useEffect } from 'react';
import { useFetchers, useLocation, useNavigation } from 'react-router-dom';
import { nprogress, NavigationProgress } from '@mantine/nprogress';
import '@mantine/nprogress/styles.css';

export default function ProgressWrapper({ children }: { children: React.ReactNode }) {
	const location = useLocation();
	const navigation = useNavigation();
	const fetchers = useFetchers();

	useEffect(() => {
		if (location.hash) {
			setTimeout(() => {
				document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 100);
		} else {
			document.getElementById('site')?.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			});
		}
	}, [location.hash]);

	useEffect(() => {
		nprogress.start();

		const fetchersIdle = fetchers.every((f) => f.state === 'idle');

		if (navigation.state === 'idle' && fetchersIdle) {
			const handleProgress = setTimeout(() => {
				nprogress.complete();
			}, 100);

			return () => {
				clearTimeout(handleProgress);
			};
		}
	}, [navigation.state, fetchers]);

	return (
		<>
			<NavigationProgress />
			{children}
		</>
	);
}
