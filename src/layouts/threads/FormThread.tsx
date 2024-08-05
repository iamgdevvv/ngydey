import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Loader, Skeleton, Text, TextInput } from '@mantine/core';
import { TransformedValues, useForm, zodResolver } from '@mantine/form';
import { rtkQueryLoading } from '@/helper/redux-utils';
import { removeEmtpyElements } from '@/helper/react-utils';
import { useCreateThreadMutation } from '@/redux/apis/forumApi';
import { PayloadThread, ThreadSchema } from '@/schema/thread';
import Message, { MessageRest } from '@/components/Message';
import styles from '@/styles/layouts/FormThread.module.css';

const Wysiwyg = lazy(() => import('@/components/Wysiwyg.tsx'));

type Prop = {
	disabled?: boolean;
	className?: string;
	onSuccess: (thread: Thread) => void;
};

export default function FormThread({ className = '', disabled = false, onSuccess }: Prop) {
	const [isInvalidComment, setIsInvalidComment] = useState(false);
	const [triggerCreateThread, resultCreateThread] = useCreateThreadMutation();

	const isLoadingCreateThread = useMemo(() => {
		return rtkQueryLoading(resultCreateThread);
	}, [resultCreateThread]);

	const form = useForm<PayloadThread>({
		validate: zodResolver(ThreadSchema),
		validateInputOnBlur: true,
	});

	const handleSubmit = useCallback(
		async (values: TransformedValues<typeof form>) => {
			await triggerCreateThread(values);
		},
		[triggerCreateThread]
	);

	useEffect(() => {
		if (resultCreateThread.isSuccess) {
			onSuccess(resultCreateThread.data.data.thread);
		}
	}, [resultCreateThread, onSuccess]);

	return (
		<form
			onSubmit={form.onSubmit(handleSubmit, () => {
				setIsInvalidComment(Boolean(form.values.body) === false);
			})}
			className={`${styles.form_thread} ${className}`}
		>
			<MessageRest
				result={resultCreateThread}
				mb='lg'
			/>
			<TextInput
				label='Title'
				size='md'
				mb='md'
				{...form.getInputProps('title')}
			/>
			<Suspense
				fallback={
					<>
						<Skeleton
							height={22}
							width='20%'
							radius='sm'
							mb='xs'
						/>
						<Skeleton
							height={126}
							width='100%'
							radius='sm'
						/>
					</>
				}
			>
				<Text
					size='md'
					mb='xs'
				>
					Body
				</Text>
				<Wysiwyg
					form={form}
					name='body'
					disabled={isLoadingCreateThread || disabled}
					heading={['style', 'format', 'link']}
					onChange={(content) => {
						setIsInvalidComment(Boolean(removeEmtpyElements(content.editor.getHTML())) === false);
					}}
				/>
			</Suspense>
			<Message
				show={isInvalidComment || (Boolean(form.values.body) === false && form.isTouched())}
				state='error'
				mt='sm'
				mb='md'
			>
				Empty body doesn't allowed
			</Message>
			<TextInput
				label='Tag'
				size='md'
				mb='md'
				mt={isInvalidComment ? '' : 'md'}
				{...form.getInputProps('category')}
			/>
			<Button
				type='submit'
				mt='sm'
				size='md'
				disabled={isLoadingCreateThread}
				className='ml-auto'
			>
				{isLoadingCreateThread ? <Loader size='sm' /> : 'Create'}
			</Button>
		</form>
	);
}
