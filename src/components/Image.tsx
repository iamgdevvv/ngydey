import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from '@/styles/components/Image.module.css';

type Props = {
	src: string;
	href?: string;
	alt?: string;
	loading?: 'eager' | 'lazy';
	className?: string;
	parentClass?: string;
};

export default function Image({
    src,
    href = '',
    alt = '',
    loading = 'lazy',
    className = '',
    parentClass = ''
}: Props) {
	const imgElem = useMemo(() => {
		return (
			<img
				src={src}
				alt={alt}
				loading={loading}
				className={`${styles.img} ${className}`}
			/>
		);
	}, [src, alt, loading, className]);

	return (
		<figure className={`${styles.image_wrapper} ${parentClass}`}>
			{href !== '' ? (
				<Link
					to={href}
					className={styles.image_inner}
				>{imgElem}</Link>
			) : (
				<div className={styles.image_inner}>{imgElem}</div>
			)}
		</figure>
	);
}
