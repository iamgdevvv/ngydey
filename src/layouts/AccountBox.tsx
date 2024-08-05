import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiPaperPlaneTiltBold, PiSignInBold, PiSignOutBold, PiUserPlusBold } from 'react-icons/pi';
import { Avatar, Modal } from '@mantine/core';
import { inlineStyle } from '@/helper/react-utils';
import { useDisclosure } from '@mantine/hooks';
import { useGetUser, useLogout, useIsLogin } from '@/hooks/auth-user';
import FormThread from '@/layouts/threads/FormThread';
import Button from '@/components/Button';
import styles from '@/styles/layouts/AccountBox.module.css';

type Props = {
	className?: string;
	parentClass?: string;
};

export default function AccountBox({ className = '', parentClass = '' }: Props) {
	const isLogin = useIsLogin();
	const getUser = useGetUser();
	const navigate = useNavigate();
	const [openedFormThread, { open, close }] = useDisclosure(false);
	const handleLogout = useLogout();
	const [heightBox, setHeightBox] = useState<number>(0);
	const boxRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (boxRef.current?.offsetHeight) {
			setHeightBox(boxRef.current.offsetHeight);
		}
	}, [boxRef.current?.offsetHeight]);

	return (
		<>
			<header
				className={`${styles.account_box_wrapper} ${parentClass}`}
				style={inlineStyle({
					'--height-box': `${heightBox}px`,
				})}
			>
				<div
					ref={boxRef}
					className={`${styles.account_box} ${className}`}
				>
					<div className={styles.detail_account}>
						<Avatar
							src={getUser?.avatar}
							radius='xl'
							alt={getUser?.name || 'Guest'}
							className={styles.account_avatar}
						/>
						{/* <PiUserCircle className={styles.account_avatar} /> */}
						<span className={styles.account_name}>{getUser?.name || 'Guest'}</span>
						<span className={styles.account_meta}>{getUser?.email || 'Please login or register.'}</span>
					</div>
					<div className={styles.action_account}>
						{isLogin ? (
							<Button
								buttonSize='auto'
								buttonType='outline'
								className={`${styles.cta_action} ${styles.cta_action_logout}`}
								parentClass={styles.item_action}
								onClick={() => handleLogout()}
							>
								<PiSignOutBold className={styles.icon_action_account} />
							</Button>
						) : (
							<>
								<Button
									href='/register'
									buttonSize='auto'
									buttonType='outline'
									className={styles.cta_action}
									parentClass={styles.item_action}
								>
									<PiUserPlusBold />
								</Button>
								<Button
									href='/login'
									buttonSize='auto'
									buttonType='outline'
									className={styles.cta_action}
									parentClass={styles.item_action}
								>
									<PiSignInBold />
								</Button>
							</>
						)}
					</div>
					{isLogin ? (
						<Button
							buttonSize='full'
							className={styles.cta_action_add}
							parentClass={styles.user_action_account}
							onClick={open}
						>
							<span>What are thinking or any idea to share?</span>
							<PiPaperPlaneTiltBold className={styles.icon_action_account} />
						</Button>
					) : null}
				</div>
			</header>
			<Modal
				title='New Thread'
				opened={openedFormThread}
				size='lg'
				radius='md'
				onClose={close}
				centered
			>
				<FormThread
					onSuccess={(thread) => {
						close();
						navigate(`/ideas/${thread.id}`);
					}}
				/>
			</Modal>
		</>
	);
}
