import { useMemo } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { PiHandsClapping, PiSmileyNervous } from 'react-icons/pi';
import { Skeleton } from '@mantine/core';
import { rtkQueryLoading } from '@/helper/redux-utils';
import { useGetUser } from '@/hooks/auth-user';
import { useReqDownVoteComment, useReqNeutralizeVoteComment, useReqUpVoteComment } from '@/hooks/threads';
import Button from '@/components/Button';
import styles from '@/styles/layouts/BlockComment.module.css';

dayjs.extend(relativeTime);

type Prop = {
	data: ItemComment;
	thread: Thread;
	disabled?: boolean;
	className?: string;
};

export default function BlockComment({ data, thread, disabled = false, className = '' }: Prop) {
	const user = useGetUser();
	const { resultUpVote, handleTriggerUpVote } = useReqUpVoteComment();
	const { resultDownVote, handleTriggerDownVote } = useReqDownVoteComment();
	const { resultNeutralizeVote, handleTriggerNeutralizeVote } = useReqNeutralizeVoteComment();

	const isLoadingVote = useMemo(() => {
		return (
			rtkQueryLoading(resultUpVote) || rtkQueryLoading(resultDownVote) || rtkQueryLoading(resultNeutralizeVote)
		);
	}, [resultUpVote, resultDownVote, resultNeutralizeVote]);

	const isUserUpVote = useMemo(() => {
		return data?.upVotesBy.includes(user?.id);
	}, [data, user]);

	const isUserDownVote = useMemo(() => {
		return data?.downVotesBy.includes(user?.id);
	}, [data, user]);

	return (
		<div className={`${styles.listblock} ${className}`}>
			<div className={styles.body_block}>
				<h4 className={styles.title}>{data.owner.name}</h4>
				<div
					className={styles.excerpt}
					dangerouslySetInnerHTML={{ __html: data.content }}
				/>
			</div>
			<div className={styles.head_block}>
				<ul className={styles.metas}>
					<li>
						<Button
							disabled={disabled || isLoadingVote}
							buttonType='outline'
							className={`${styles.meta} ${isUserUpVote ? styles.meta__active : ''}`}
							onClick={() => {
								if (data.id) {
									if (isUserUpVote) {
										handleTriggerNeutralizeVote({
											commentId: data.id,
											threadId: thread.id,
										});
									} else {
										handleTriggerUpVote({
											commentId: data.id,
											threadId: thread.id,
										});
									}
								}
							}}
						>
							<PiHandsClapping className={styles.icon_meta} />
							{isLoadingVote ? (
								<Skeleton
									height={16}
									width={20}
									ml={0}
									radius='xl'
								/>
							) : (
								data.upVotesBy.length
							)}
						</Button>
					</li>
					<li>
						<Button
							disabled={disabled || isLoadingVote}
							buttonType='outline'
							className={`${styles.meta} ${styles.meta_downvote} ${
								isUserDownVote ? styles.meta__active : ''
							}`}
							onClick={() => {
								if (data.id) {
									if (isUserUpVote) {
										handleTriggerNeutralizeVote({
											commentId: data.id,
											threadId: thread.id,
										});
									} else {
										handleTriggerDownVote({
											commentId: data.id,
											threadId: thread.id,
										});
									}
								}
							}}
						>
							<PiSmileyNervous className={styles.icon_meta} />
							{isLoadingVote ? (
								<Skeleton
									height={16}
									width={20}
									ml={0}
									radius='xl'
								/>
							) : (
								data.downVotesBy.length
							)}
						</Button>
					</li>
				</ul>
				<span className={styles.times}>{dayjs(data.createdAt).fromNow()}</span>
			</div>
		</div>
	);
}
