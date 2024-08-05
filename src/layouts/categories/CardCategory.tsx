import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { slugify } from '@/helper/react-utils';
import styles from '@/styles/layouts/CardCategory.module.css';

dayjs.extend(relativeTime);

type Prop = {
	data: Category;
	className?: string;
};

export default function CardCategory({ data, className = '' }: Prop) {

	return (
		<Link
			to={`/ideas/tag/${slugify(data.slug)}`}
			className={`${styles.listcard} ${className}`}
		>
			<div className={styles.body_card}>
				<h4 className={styles.title}>{data.title}</h4>
				<div className={styles.content}>{data.count === 1 ? `${data.count} idea` : `${data.count} ideas`}</div>
			</div>
		</Link>
	);
}
