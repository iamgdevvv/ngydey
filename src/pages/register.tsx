import Navigation from '@/layouts/Navigation';
import RegisterForm from '@/layouts/auths/RegisterForm';

export default function RegisterPage() {
	return (
		<>
			<Navigation>Register</Navigation>
			<main className='site-main'>
				<RegisterForm />
			</main>
		</>
	);
}
