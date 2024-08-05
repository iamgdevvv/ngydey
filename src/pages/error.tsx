import Navigation from '@/layouts/Navigation';

export default function ErrorPage() {
	return (
		<>
			<Navigation className='capitalize'>404 Page</Navigation>
			<main className='site-main'>
				<h1>Oops!</h1>
				<p>Sorry, an unexpected error has occurred.</p>
			</main>
		</>
	);
}
