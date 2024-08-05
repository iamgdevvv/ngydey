import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, PasswordInput } from '@mantine/core';
import { TransformedValues, useForm } from '@mantine/form';
import { TextInput } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { PayloadLogin, LoginSchema } from '@/schema/auth';
import { useLogin } from '@/hooks/auth-user';
import { MessageRest } from '@/components/Message';

type Prop = {
	className?: string;
};

export default function LoginForm({ className = '' }: Prop) {
	const navigate = useNavigate();
	const [triggerLogin, isLogin, resultLogin] = useLogin();
	const form = useForm<PayloadLogin>({
		validate: zodResolver(LoginSchema),
		validateInputOnBlur: true,
	});

	const handleSubmit = useCallback(
		(values: TransformedValues<typeof form>) => {
			triggerLogin(values);
		},
		[triggerLogin]
	);

	useEffect(() => {
		if (isLogin) {
			navigate('/');
		}
	}, [isLogin, navigate]);

	return (
		<form
			className={`${className}`}
			onSubmit={form.onSubmit(handleSubmit)}
		>
			<MessageRest
				hideSuccess={false}
				result={resultLogin}
				mb='lg'
			/>
			<TextInput
				label='Email'
				size='md'
				mb='md'
				{...form.getInputProps('emailz')}
			/>
			<PasswordInput
				label='Password'
				size='md'
				mb='md'
				{...form.getInputProps('password')}
			/>
			<Button
				type='submit'
				fullWidth
				mt='xl'
				size='lg'
			>
				Login
			</Button>
		</form>
	);
}
