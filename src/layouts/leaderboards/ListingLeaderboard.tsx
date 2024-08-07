import { useId } from 'react';
import { inlineStyle } from '@/helper/react-utils';
import BlockLeaderboard from '@/layouts/leaderboards/BlockLeaderboard';
import styles from '@/styles/layouts/Listing.module.css';
import { Skeleton } from '@mantine/core';

type Prop = {
	data: ItemLeaderboards[];
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

export default function ListingLeaderboard({
	data = [],
	loading = false,
	type = 'block',
	cols = 1,
	colsTablet = 1,
	colsMobile = 1,
	colGap = 20,
	rowGap = 10,
	slider = false,
	className = '',
	innerClass = '',
	children,
}: Prop) {
	const listingId = useId();

	if (loading) {
		return (
			<div className={`${styles.listing_wrapper_loading} ${className}`}>
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

	if (data.length < 1) {
		return <div className={`${styles.listing_wrapper} ${className}`}>Empty leaderboard</div>;
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
				{data.map((itemData, index) => (
					<div
						key={`${listingId}-${index}`}
						className={styles.item}
					>
						{type === 'block' ? <BlockLeaderboard data={itemData} /> : null}
					</div>
				))}
			</div>
			{children}
		</div>
	);
}
