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
	const { triggerLogin, isLoadingLogin, resultLogin, resultUser } = useLogin();
	const form = useForm<PayloadLogin>({
		validate: zodResolver(LoginSchema),
		validateInputOnBlur: true,
	});

	const handleSubmit = useCallback(
		async (values: TransformedValues<typeof form>) => {
			await triggerLogin(values);
		},
		[triggerLogin]
	);

	useEffect(() => {
		if (resultLogin.isSuccess && resultUser.isSuccess) {
			navigate('/');
		}
	}, [resultUser.isSuccess, resultLogin.isSuccess, navigate]);

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
			<MessageRest
				hideSuccess={false}
				result={resultUser}
				mb='lg'
			/>
			<TextInput
				label='Email'
				size='md'
				mb='md'
				disabled={isLoadingLogin}
				{...form.getInputProps('email')}
			/>
			<PasswordInput
				label='Password'
				size='md'
				mb='md'
				disabled={isLoadingLogin}
				{...form.getInputProps('password')}
			/>
			<Button
				type='submit'
				fullWidth
				mt='xl'
				size='lg'
				loading={isLoadingLogin}
				disabled={isLoadingLogin}
			>
				Login
			</Button>
		</form>
	);
}
