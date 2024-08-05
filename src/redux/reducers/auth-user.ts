import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AuthState = {
	token: string;
	isLogin: boolean
};

const initialUser = {
	id: '',
	name: '',
	email: '',
	avatar: '',
} as User

const initialAuth = {
	token: '',
	isLogin: false
} as AuthState;

const authSlice = createSlice({
	name: 'auth_user',
	initialState: {
		auth: initialAuth,
		user: initialUser
	},
	reducers: {
		setAuth: (state, action: PayloadAction<AuthState>) => {
			state.auth = action.payload;
		},
		removeAuth: (state) => {
			state.auth = initialAuth;
		},
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		removeUser: (state) => {
			state.user = initialUser;
		},
	},
});

export const { setAuth, removeAuth, setUser, removeUser } = authSlice.actions;

export default authSlice;
