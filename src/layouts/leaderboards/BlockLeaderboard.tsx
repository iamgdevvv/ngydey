import { Link } from 'react-router-dom';
import styles from '@/styles/layouts/BlockLeaderboard.module.css';
import Image from '@/components/Image';

type Prop = {
	data: ItemLeaderboards;
	className?: string;
};

export default function BlockLeaderboard({ data, className = '' }: Prop) {
	return (
		<Link
			to={`/users/${data.user.id}`}
			className={`${styles.listblock} ${className}`}
		>
			<Image
				src={data.user.avatar}
				parentClass={styles.avatar}
			/>
			<h4 className={styles.title}>{data.user.name}</h4>
			<span className={styles.score}>{data.score}</span>
		</Link>
	);
}
