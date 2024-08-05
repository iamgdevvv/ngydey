import Navigation from '@/layouts/Navigation';
import LoginForm from '@/layouts/auths/LoginForm';

export default function LoginPage() {
	return (
		<>
			<Navigation>Login</Navigation>
			<main className='site-main'>
				<LoginForm />
			</main>
		</>
	);
}