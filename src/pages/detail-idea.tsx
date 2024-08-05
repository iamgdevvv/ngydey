import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Avatar, Skeleton } from '@mantine/core';
import { PiChatTeardropDots, PiHandsClapping, PiSmileyNervous } from 'react-icons/pi';
import { useReqDownVoteThread, useReqNeutralizeVoteThread, useReqUpVoteThread, useResThread } from '@/hooks/threads';
import { useGetUser } from '@/hooks/auth-user';
import { rtkQueryLoading } from '@/helper/redux-utils';
import { slugify } from '@/helper/react-utils';
import Button from '@/components/Button';
import Navigation from '@/layouts/Navigation';
import ListingComment from '@/layouts/comments/ListingComment';
import FormComment from '@/layouts/comments/FormComment';
import stylesThread from '@/styles/layouts/BlockThread.module.css';
import styles from '@/styles/pages/detail-idea.module.css';

export default function DetailIdeaPage() {
	const user = useGetUser();
	const { ideaId } = useParams();
	const { dataThread, resultThread, handleTriggerThread } = useResThread(ideaId || '');
	const { resultUpVote, handleTriggerUpVote } = useReqUpVoteThread();
	const { resultDownVote, handleTriggerDownVote } = useReqDownVoteThread();
	const { resultNeutralizeVote, handleTriggerNeutralizeVote } = useReqNeutralizeVoteThread();

	const isLoadingThread = useMemo(() => {
		return rtkQueryLoading(resultThread);
	}, [resultThread]);

	const isLoadingVote = useMemo(() => {
		return (
			rtkQueryLoading(resultUpVote) || rtkQueryLoading(resultDownVote) || rtkQueryLoading(resultNeutralizeVote)
		);
	}, [resultUpVote, resultDownVote, resultNeutralizeVote]);

	const isLoading = useMemo(() => {
		return isLoadingThread || isLoadingVote;
	}, [isLoadingThread, isLoadingVote]);

	const isUserUpVote = useMemo(() => {
		return dataThread?.upVotesBy.includes(user?.id);
	}, [dataThread, user]);

	const isUserDownVote = useMemo(() => {
		return dataThread?.downVotesBy.includes(user?.id);
	}, [dataThread, user]);

	if (isLoadingThread) {
		return (
			<>
				<Navigation className='capitalize'>
					<Skeleton
						height={24}
						width='50%'
						radius='xl'
					/>
				</Navigation>
				<main className='site-main'>
					<Skeleton
						height={50}
						circle
						mb='xl'
					/>
					<Skeleton
						height={8}
						radius='xl'
					/>
					<Skeleton
						height={8}
						mt={6}
						radius='xl'
					/>
					<Skeleton
						height={8}
						mt={6}
						width='70%'
						radius='xl'
					/>
				</main>
			</>
		);
	}

	if(!dataThread) {
		return (
			<>
				<Navigation className='capitalize'>Idea</Navigation>
				<main className='site-main'>
					<p>Idea not found</p>
				</main>
			</>
		);
	}

	return (
		<>
			<Navigation className='capitalize'>{dataThread.title || 'Idea'}</Navigation>
			<main className='site-main'>
				<Link
					to={`/users/${dataThread.owner.id}`}
					className={styles.author_thread}
				>
					<Avatar
						component={Link}
						to={`/users/${dataThread.owner.id}`}
						src={dataThread.owner.avatar}
						radius='xl'
						alt={dataThread.owner?.name || 'Guest'}
						className={styles.avatar_thread}
					/>
					<span className={styles.name_author}>{dataThread.owner?.name || 'Guest'}</span>
					<span className={styles.cta_author}>More Ideas</span>
				</Link>
				<h1 className={styles.title_nav}>{dataThread.title || 'Idea'}</h1>
				<span className={styles.date_thread}>{dayjs(dataThread.createdAt).fromNow()}</span>
				{dataThread.body ? (
					<article
						className={styles.body_thread}
						dangerouslySetInnerHTML={{ __html: dataThread.body }}
					/>
				) : null}
				<div className={styles.meta_thread}>
					<ul className={styles.metas}>
						{dataThread.category ? (
							<li className='mr-auto'>
								<Button
									href={`/ideas/tag/${slugify(dataThread.category)}`}
									disabled={isLoading}
									parentClass='!w-auto'
									buttonType='inline'
									className={stylesThread.category}
								>
									#{dataThread.category}
								</Button>
							</li>
						) : null}
						{dataThread.category && dataThread.comments ? (
							<li>
								<Button
									buttonType='outline'
									href={`/ideas/${dataThread.id}/#comments`}
									className={stylesThread.meta}
								>
									<PiChatTeardropDots className={stylesThread.icon_meta} />
									{dataThread.comments.length}
								</Button>
							</li>
						) : null}
						{dataThread.upVotesBy ? (
							<li>
								<Button
									disabled={isLoading}
									buttonType='outline'
									className={`${stylesThread.meta} ${isUserUpVote ? stylesThread.meta__active : ''}`}
									onClick={() => {
										if (ideaId) {
											if (isUserUpVote) {
												handleTriggerNeutralizeVote({
													threadId: ideaId,
												});
											} else {
												handleTriggerUpVote({
													threadId: ideaId,
												});
											}

											handleTriggerThread();
										}
									}}
								>
									<PiHandsClapping className={stylesThread.icon_meta} />
									{isLoadingVote ? (
										<Skeleton
											height={16}
											width={20}
											ml={0}
											radius='xl'
										/>
									) : (
										dataThread.upVotesBy.length
									)}
								</Button>
							</li>
						) : null}
						{dataThread.downVotesBy ? (
							<li>
								<Button
									buttonType='outline'
									disabled={isLoading}
									className={`${stylesThread.meta} ${stylesThread.meta_downvote} ${
										isUserDownVote ? stylesThread.meta__active : ''
									}`}
									onClick={() => {
										if (ideaId) {
											if (isUserDownVote) {
												handleTriggerNeutralizeVote({
													threadId: ideaId,
												});
											} else {
												handleTriggerDownVote({
													threadId: ideaId,
												});
											}

											handleTriggerThread();
										}
									}}
								>
									<PiSmileyNervous className={stylesThread.icon_meta} />
									{isLoadingVote ? (
										<Skeleton
											height={16}
											width={20}
											ml={0}
											radius='xl'
										/>
									) : (
										dataThread.downVotesBy.length
									)}
								</Button>
							</li>
						) : null}
					</ul>
				</div>
				<div id='comments'>
					<h2>Comment</h2>
					<ListingComment
						disabled={isLoading}
						thread={dataThread}
					/>
					<FormComment
						threadId={ideaId || ''}
						disabled={isLoading}
						className={styles.comment_idea}
						onSuccess={handleTriggerThread}
					/>
				</div>
			</main>
		</>
	);
}
