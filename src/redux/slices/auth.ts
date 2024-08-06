import { createSlice } from '@reduxjs/toolkit';
import forumApi from '@/redux/apis/forumApi';

export type AuthState = {
	token: string;
	isLogin: boolean;
};

const initialAuth = {
	token: '',
	isLogin: false,
} as AuthState;

const authSlice = createSlice({
	name: 'auth_slice',
	initialState: {
		auth: initialAuth,
	},
	reducers: {
		removeAuth: (state) => {
			state.auth = initialAuth;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(forumApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
			state.auth = {
				token: payload.data.token,
				isLogin: true,
			};
		});
	},
});

const { removeAuth } = authSlice.actions;

export { initialAuth, removeAuth };

export default authSlice;
