import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGetAuth } from '@/hooks/auth-user';

type Props = {
	onlyLogin?: boolean;
	notLogin?: boolean;
	children: ReactNode;
};

const auth_locations = ['/register', '/login'];

export default function ProtectedComp({ onlyLogin = true, notLogin = false, children }: Props) {
	const auth = useGetAuth();
	const location = useLocation();

	if (notLogin && auth.isLogin) {
		return <Navigate to='/' />;
	}

	if (onlyLogin && !auth.isLogin && !auth_locations.includes(location.pathname)) {
		return <Navigate to='/login' />;
	}

	return children;
}
