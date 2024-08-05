import { ReactNode, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { inlineStyle } from '@/helper/react-utils';
import styles from '@/styles/components/Button.module.css';

type Props = {
	href?: string;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	buttonType?: 'inline' | 'fill' | 'outline';
	buttonSize?: 'auto' | 'full';
	className?: string;
	parentClass?: string;
	children: ReactNode;
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	iconGap?: number;
	onClick?: () => void;
};

export default function Button({
	href = '',
	type = 'button',
	disabled = false,
	buttonType = 'fill',
	buttonSize = 'auto',
	className = '',
	parentClass = '',
	// startIcon,
	// endIcon,
	iconGap = 10,
	children,
	onClick,
}: Props) {
	const classNameButton = useMemo(() => {
		return `${styles.btn} ${styles[`btn_${buttonType}`]} ${styles[`btn_size_${buttonSize}`]} ${className}`;
	}, [buttonType, buttonSize, className]);

	return (
		<div
			className={`${styles.btn_wrapper} ${parentClass}`}
			style={inlineStyle({
				'--icon-gap': `${iconGap}px`,
			})}
		>
			{href !== '' ? (
				<Link
					to={href}
					className={classNameButton}
					onClick={onClick}
				>
					{children}
				</Link>
			) : (
				<button
					type={type}
					disabled={disabled}
					className={classNameButton}
					onClick={onClick}
				>
					{children}
				</button>
			)}
		</div>
	);
}
