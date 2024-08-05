import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { PiArrowCircleRight, PiChatTeardropDots, PiHandsClapping, PiSmileyNervous } from 'react-icons/pi';
import { Skeleton } from '@mantine/core';
import { slugify } from '@/helper/react-utils';
import { rtkQueryLoading } from '@/helper/redux-utils';
import { useGetUser } from '@/hooks/auth-user';
import { useReqDownVoteThread, useReqNeutralizeVoteThread, useReqUpVoteThread } from '@/hooks/threads';
import Button from '@/components/Button';
import styles from '@/styles/layouts/BlockThread.module.css';

dayjs.extend(relativeTime);

type Prop = {
	data: ItemThreads;
	className?: string;
};

export default function BlockThread({ data, className = '' }: Prop) {
	const user = useGetUser();
	const { resultUpVote, handleTriggerUpVote } = useReqUpVoteThread();
	const { resultDownVote, handleTriggerDownVote } = useReqDownVoteThread();
	const { resultNeutralizeVote, handleTriggerNeutralizeVote } = useReqNeutralizeVoteThread();

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
				<h4 className={styles.title}>
					<Link to={`/ideas/${data.id}`}>{data.title}</Link>
				</h4>
				<div
					className={styles.excerpt}
					dangerouslySetInnerHTML={{ __html: data.body }}
				/>
				<div className={styles.actions}>
					<Button
						href={`/ideas/tag/${slugify(data.category)}`}
						parentClass='!w-auto'
						buttonType='inline'
						className={styles.category}
					>
						#{data.category}
					</Button>
					<Button
						href={`/ideas/${data.id}`}
						buttonType='inline'
						parentClass={styles.cta}
					>
						<span>Read More</span>
						<PiArrowCircleRight className={styles.icon_cta} />
					</Button>
				</div>
			</div>
			<div className={styles.head_block}>
				<ul className={styles.metas}>
					<li>
						<Button
							buttonType='outline'
							href={`/ideas/${data.id}/#comments`}
							className={styles.meta}
						>
							<PiChatTeardropDots className={styles.icon_meta} />
							{data.totalComments}
						</Button>
					</li>
					<li>
						<Button
							disabled={isLoadingVote}
							buttonType='outline'
							className={`${styles.meta} ${isUserUpVote ? styles.meta__active : ''}`}
							onClick={() => {
								if (data.id) {
									if (isUserUpVote) {
										handleTriggerNeutralizeVote({
											threadId: data.id,
										});
									} else {
										handleTriggerUpVote({
											threadId: data.id,
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
							disabled={isLoadingVote}
							buttonType='outline'
							className={`${styles.meta} ${styles.meta_downvote} ${
								isUserDownVote ? styles.meta__active : ''
							}`}
							onClick={() => {
								if (data.id) {
									if (isUserDownVote) {
										handleTriggerNeutralizeVote({
											threadId: data.id,
										});
									} else {
										handleTriggerDownVote({
											threadId: data.id,
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
