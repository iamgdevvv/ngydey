import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, PasswordInput } from '@mantine/core';
import { TransformedValues, useForm } from '@mantine/form';
import { TextInput } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { RegisterSchema, PayloadRegister } from '@/schema/auth';
import { useLogin } from '@/hooks/auth-user';
import { useRegisterUserMutation } from '@/redux/apis/forumApi';
import { MessageRest } from '@/components/Message';
import { rtkQueryLoading } from '@/helper/redux-utils';

type Prop = {
	className?: string;
};

export default function RegisterForm({ className = '' }: Prop) {
	const navigate = useNavigate();
	const { triggerLogin, isLoadingLogin, resultLogin, resultUser } = useLogin();
	const [triggerRegister, resultRegister] = useRegisterUserMutation();
	const form = useForm<PayloadRegister>({
		validate: zodResolver(RegisterSchema),
		validateInputOnBlur: true,
	});

	const isLoadingRegister = useMemo(() => {
		return isLoadingLogin || rtkQueryLoading(resultRegister);
	}, [isLoadingLogin, resultRegister]);

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
				result={resultRegister}
				mb='lg'
			/>
			<TextInput
				label='Name'
				size='md'
				mb='md'
				disabled={isLoadingRegister}
				{...form.getInputProps('name')}
			/>
			<TextInput
				label='Email'
				size='md'
				mb='md'
				disabled={isLoadingRegister}
				{...form.getInputProps('email')}
			/>
			<PasswordInput
				label='Password'
				size='md'
				mb='md'
				disabled={isLoadingRegister}
				{...form.getInputProps('password')}
			/>
			<Button
				type='submit'
				fullWidth
				mt='xl'
				size='lg'
				loading={isLoadingRegister}
				disabled={isLoadingRegister}
			>
				Register
			</Button>
		</form>
	);
}
