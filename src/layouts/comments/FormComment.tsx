import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { Avatar, Button } from '@mantine/core';
import { TransformedValues, useForm, zodResolver } from '@mantine/form';
import { rtkQueryLoading } from '@/helper/redux-utils';
import { useCreateCommentMutation } from '@/redux/apis/forumApi';
import { useGetUser } from '@/hooks/auth-user';
import { CommentSchema, PayloadComment } from '@/schema/thread';
import Message, { MessageRest } from '@/components/Message';
import styles from '@/styles/layouts/FormComment.module.css';

const Wysiwyg = lazy(() => import('@/components/Wysiwyg.tsx'));

type Prop = {
	threadId: string;
	disabled?: boolean;
	className?: string;
	onSuccess: () => void;
};

export default function FormComment({ threadId, className = '', disabled = false, onSuccess }: Prop) {
	const user = useGetUser();
	const [isSubmited, setSubmited] = useState(false);
	const [triggerCreateComment, resultCreateComment] = useCreateCommentMutation();

	const isLoadingCreateComment = useMemo(() => {
		return rtkQueryLoading(resultCreateComment);
	}, [resultCreateComment]);

	const form = useForm<PayloadComment>({
		validate: zodResolver(CommentSchema),
		validateInputOnBlur: true,
	});

	const isInvalidComment = useMemo(
		() => (isSubmited || form.isTouched()) && (Boolean(form.values.content) === false || form.isValid() === false),
		[isSubmited, form]
	);

	const handleSubmit = useCallback(
		(values: TransformedValues<typeof form>) => {
			if (!isInvalidComment) {
				triggerCreateComment({
					content: values.content,
					threadId,
				});
			}
		},
		[triggerCreateComment, isInvalidComment, threadId]
	);

	useEffect(() => {
		if (resultCreateComment.isSuccess) {
			onSuccess();
		}
	}, [resultCreateComment, onSuccess]);

	if (!user.id) {
		return null;
	}

	return (
		<form
			onSubmit={form.onSubmit(handleSubmit, () => setSubmited(true))}
			className={`${styles.form_comment} ${className}`}
		>
			<MessageRest
				result={resultCreateComment}
				mb='lg'
			/>
			<div className={styles.author_comment}>
				<Avatar
					src={user.avatar}
					radius='xl'
					alt={user.name || 'Guest'}
					className={styles.avatar_comment}
				/>
				<Suspense fallback={'<Loading />'}>
					<Wysiwyg
						form={form}
						name='content'
						disabled={isLoadingCreateComment || disabled}
						heading={['style', 'format', 'link']}
					/>
				</Suspense>
			</div>
			<Message
				show={isInvalidComment}
				state='error'
				mt='sm'
			>
				Empty comment doesn't allowed
			</Message>
			<Button
				type='submit'
				mt='sm'
				size='md'
				loading={isLoadingCreateComment}
				disabled={isLoadingCreateComment || disabled}
				className='ml-auto'
			>
				Comment
			</Button>
		</form>
	);
}
