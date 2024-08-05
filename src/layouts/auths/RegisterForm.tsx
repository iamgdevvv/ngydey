import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, PasswordInput } from '@mantine/core';
import { TransformedValues, useForm } from '@mantine/form';
import { TextInput } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { RegisterSchema, PayloadRegister } from '@/schema/auth';
import { useLogin } from '@/hooks/auth-user';
import { useRegisterUserMutation } from '@/redux/apis/forumApi';
import { MessageRest } from '@/components/Message';

type Prop = {
	className?: string;
};

export default function RegisterForm({ className = '' }: Prop) {
	const navigate = useNavigate();
	const [triggerLogin, isLogin] = useLogin();
	const [triggerRegister, resultRegister] = useRegisterUserMutation();
	const form = useForm<PayloadRegister>({
		validate: zodResolver(RegisterSchema),
		validateInputOnBlur: true,
	});

	const handleSubmit = useCallback(
		(values: TransformedValues<typeof form>) => {
			triggerRegister(values);
		},
		[triggerRegister]
	);

	useEffect(() => {
		const { email, password } = form.values;

		if (resultRegister.isSuccess && email && password) {
			triggerLogin({
				email,
				password,
			});
		}
	}, [form.values, resultRegister.isSuccess, triggerLogin]);

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
				result={resultRegister}
				mb='lg'
			/>
			<TextInput
				label='Name'
				size='md'
				mb='md'
				{...form.getInputProps('name')}
			/>
			<TextInput
				label='Email'
				size='md'
				mb='md'
				{...form.getInputProps('email')}
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
				Register
			</Button>
		</form>
	);
}
