import { useId } from 'react';
import { Loader, Skeleton } from '@mantine/core';
import { inlineStyle } from '@/helper/react-utils';
import BlockComment from '@/layouts/comments/BlockComment';
import styles from '@/styles/layouts/Listing.module.css';

type Prop = {
	thread: Thread;
	disabled?: boolean;
	loading?: boolean;
	type?: 'block';
	cols?: number;
	colsTablet?: number;
	colsMobile?: number;
	colGap?: number;
	rowGap?: number;
	slider?: boolean;
	className?: string;
	innerClass?: string;
	children?: React.ReactNode;
};

export default function ListingComment({
	thread,
	disabled = false,
	loading = false,
	type = 'block',
	cols = 1,
	colsTablet = 1,
	colsMobile = 1,
	colGap = 10,
	rowGap = 20,
	slider = false,
	className = '',
	innerClass = '',
	children,
}: Prop) {
	const listingId = useId();

	if (loading) {
		return (
			<div className={`${styles.listing_wrapper_loading} ${className}`}>
				<Loader
					size={30}
					mb={20}
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
			</div>
		);
	}

	if (thread.comments.length === 0) {
		return (
			<div className={`${styles.listing_wrapper} ${className}`}>
				<p className='text-center'>Be the first to left comment here.</p>
			</div>
		);
	}

	return (
		<div className={`${styles.listing_wrapper} ${className}`}>
			<div
				className={`${styles.listing} ${slider ? styles.listing_slider : ''} ${innerClass}`}
				style={inlineStyle({
					'--column': cols,
					'--column-md': colsTablet,
					'--column-sm': colsMobile,
					'--col-gap': `${colGap}px`,
					'--row-gap': `${rowGap}px`,
				})}
			>
				{thread.comments.map((itemData, index) => (
					<div
						key={`${listingId}-${index}`}
						className={styles.item}
					>
						{type === 'block' ? (
							<BlockComment
								disabled={disabled}
								data={itemData}
								thread={thread}
							/>
						) : null}
					</div>
				))}
			</div>
			{children}
		</div>
	);
}
