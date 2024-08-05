import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { TbChevronLeft } from 'react-icons/tb';
import styles from '@/styles/layouts/Navigation.module.css';

type Prop = {
	prevLink?: string;
	className?: string;
	children: ReactNode;
};

export default function Navigation({ prevLink = '', className = '', children }: Prop) {
	return (
		<nav className={`${styles.navigation} ${className}`}>
			<Link
				to={prevLink}
				className={styles.cta_prev_nav}
				onClick={() => {
					if (prevLink === '') {
						history.back();
					}
				}}
			>
				<TbChevronLeft />
			</Link>
			<div className={styles.heading_nav}>{children}</div>
		</nav>
	);
}
