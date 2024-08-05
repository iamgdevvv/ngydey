import { useId, useMemo, useState } from 'react';
import { Pagination } from '@mantine/core';
import { inlineStyle } from '@/helper/react-utils';
import BlockUser from '@/layouts/users/BlockUser';
import styles from '@/styles/layouts/Listing.module.css';

type Prop = {
	data: User[];
	perPage?: number;
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

export default function ListingUser({
	data = [],
	type = 'block',
	perPage = 10,
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
	const [pageUser, setPageUser] = useState<number>(1);

	const totalPagination = useMemo(() => {
		return Number((data.length / perPage).toFixed(0));
	}, [data, perPage]);

	const dataByPagination = useMemo(() => {
		return data.slice((pageUser - 1) * perPage, pageUser * perPage);
	}, [data, pageUser, perPage]);

	if (data.length < 1) {
		return null;
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
				{dataByPagination.map((itemData, index) => (
					<div
						key={`${listingId}-${index}`}
						className={styles.item}
					>
						{type === 'block' ? <BlockUser data={itemData} /> : null}
					</div>
				))}
			</div>
			<Pagination
				total={totalPagination}
				withEdges
				className='mt-[32px]'
				onChange={setPageUser}
			/>
			{children}
		</div>
	);
}
