import { useId } from 'react';
import { Skeleton } from '@mantine/core';
import { inlineStyle } from '@/helper/react-utils';
import CardCategory from '@/layouts/categories/CardCategory';
import styles from '@/styles/layouts/Listing.module.css';

type Prop = {
	data: Category[];
	loading?: boolean;
	type?: 'card';
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

export default function ListingCategory({
	data = [],
	loading = false,
	type = 'card',
	cols = 2.25,
	colsTablet = 1,
	colsMobile = 1,
	colGap = 4,
	rowGap = 32,
	slider = true,
	className = '',
	innerClass = '',
	children,
}: Prop) {
	const listingId = useId();

	if (loading) {
		return (
			<div className={`${styles.listing_wrapper_loading} ${className}`}>
				<Skeleton
					width='44%'
					height={120}
					radius='md'
					mr={8}
				/>
				<Skeleton
					width='44%'
					height={120}
					radius='md'
				/>
			</div>
		);
	}

	if (data.length < 1) {
		return <div className={`${styles.listing_wrapper} ${className}`}>Empty category</div>;
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
						{type === 'card' ? <CardCategory data={itemData} /> : null}
					</div>
				))}
			</div>
			{children}
		</div>
	);
}
