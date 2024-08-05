/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useState } from 'react';
import { rtkQueryLoading } from '@/helper/redux-utils';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useLazyGetUserQuery, useLoginUserMutation } from '@/redux/apis/forumApi';
import { removeAuth } from '@/redux/slices/auth';
import { removeUser } from '@/redux/slices/user';
import { PayloadLogin } from '@/schema/auth';

const useGetUser = () => {
	return useAppSelector((state) => state.user_slice.user);
};

const useGetAuth = () => {
	return useAppSelector((state) => state.auth_slice.auth);
};

const useIsLogin = (): boolean => {
	return useGetAuth().isLogin;
};

const useLogin = () => {
	const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);
	const [queryLogin, resultLogin] = useLoginUserMutation();
	const [triggerUser, resultUser] = useLazyGetUserQuery();

	const triggerLogin = useCallback(
		async (payload: PayloadLogin) => {
			setIsLoadingLogin(true);
			await queryLogin(payload);
			await triggerUser();
			setIsLoadingLogin(false);
		},
		[queryLogin, triggerUser]
	);

	return { triggerLogin, isLoadingLogin, resultLogin, resultUser };
};

const useLogout = () => {
	const dispatch = useAppDispatch();

	const handleLogout = useCallback(() => {
		dispatch(removeAuth());
		dispatch(removeUser());
	}, [dispatch]);

	return handleLogout;
};

export { useIsLogin, useGetUser, useGetAuth, useLogin, useLogout };
