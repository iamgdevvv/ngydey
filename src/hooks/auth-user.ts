/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback, useMemo } from 'react';
import { PayloadLogin } from '@/schema/auth';
import { rtkQueryLoading } from '@/helper/redux-utils';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useLazyGetUserQuery, useLoginUserMutation } from '@/redux/apis/forumApi';
import { AuthState, removeAuth, removeUser, setAuth, setUser } from '@/redux/reducers/auth-user';

const useGetUser = (): User => {
	return useAppSelector((state) => state.auth_user.user);
};

const useGetAuth = (): AuthState => {
	return useAppSelector((state) => state.auth_user.auth);
};

const useIsLogin = (): boolean => {
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const [triggerUser, resultGetUser] = useLazyGetUserQuery();
	const auth = useGetAuth();
	const user = useGetUser();

	useEffect(() => {
		if (Boolean(auth.token) && Boolean(user?.id) === false) {
			triggerUser();
		}

		setIsLogin(auth.isLogin);
	}, [auth, user, triggerUser]);

	useEffect(() => {
		if (resultGetUser.isSuccess && auth.isLogin) {
			setIsLogin(resultGetUser.isSuccess);
			dispatch(setUser(resultGetUser.data.data.user));
		}
	}, [dispatch, auth.isLogin, resultGetUser.isSuccess, resultGetUser.data]);

	return isLogin;
};

const useLogin = (): [(payload: PayloadLogin) => void, boolean, any] => {
	const dispatch = useAppDispatch();
	const [triggerLogin, resultLogin] = useLoginUserMutation();
	const [triggerUser, resultGetUser] = useLazyGetUserQuery();
	const [isLogin, setIsLogin] = useState(false);

	const isLoadingLogin = useMemo(() => {
		return rtkQueryLoading(resultLogin);
	}, [resultLogin]);

	const isLoadingUser = useMemo(() => {
		return rtkQueryLoading(resultGetUser);
	}, [resultGetUser]);

	useEffect(() => {
		if (!isLoadingLogin && resultLogin.isSuccess) {
			dispatch(
				setAuth({
					token: resultLogin.data.data.token,
					isLogin: true,
				})
			);

			triggerUser();
		}
	}, [dispatch, triggerUser, isLoadingLogin, resultLogin]);

	useEffect(() => {
		if (!isLoadingUser && resultGetUser.isSuccess) {
			dispatch(setUser(resultGetUser.data.data.user));
			setIsLogin(true);
		}
	}, [dispatch, isLoadingUser, resultGetUser]);

	return [triggerLogin, isLogin, resultLogin];
};

const useLogout = (): (() => void) => {
	const dispatch = useAppDispatch();

	const handleLogout = useCallback(() => {
		dispatch(removeAuth());

		dispatch(removeUser());
	}, [dispatch]);

	return handleLogout;
};

export { useIsLogin, useGetUser, useGetAuth, useLogin, useLogout };
