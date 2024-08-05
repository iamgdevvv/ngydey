import { createSlice } from '@reduxjs/toolkit';
import forumApi from '@/redux/apis/forumApi';

const initialUser = {
	id: '',
	name: '',
	email: '',
	avatar: '',
} as User;

const userSlice = createSlice({
	name: 'user_slice',
	initialState: {
		user: initialUser,
	},
	reducers: {
		removeUser: (state) => {
			state.user = initialUser;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(forumApi.endpoints.getUser.matchFulfilled, (state, { payload }) => {
			state.user = payload.data.user;
		});
	},
});

const { removeUser } = userSlice.actions;

export { initialUser, removeUser };

export default userSlice;
