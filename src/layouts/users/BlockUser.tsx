import { Link } from 'react-router-dom';
import styles from '@/styles/layouts/BlockLeaderboard.module.css';
import Image from '@/components/Image';
import { Button } from '@mantine/core';

type Prop = {
	data: User;
	className?: string;
};

export default function BlockUser({ data, className = '' }: Prop) {
	return (
		<Link
			to={`/users/${data.id}`}
			className={`${styles.listblock} ${className}`}
		>
			<Image
				src={data.avatar}
				parentClass={styles.avatar}
			/>
			<h4 className={`${styles.title} w-full`}>{data.name}</h4>
			<Button
				component={Link}
				to={`mailto:${data.email}`}
				size='xs'
				className='inline-block mt-[4px]'
			>
				{data.email}
			</Button>
		</Link>
	);
}
