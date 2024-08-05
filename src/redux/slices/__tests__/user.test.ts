import { describe, it, expect } from 'vitest';
import userSlice, { initialUser, removeUser } from '@/redux/slices/user';

describe('User Slice', () => {
	it('Initial state', async () => {
		expect(userSlice.getInitialState()).toMatchObject({
			user: initialUser,
		});
	});

	it('removeUser State', async () => {
		expect(userSlice.reducer(undefined, removeUser())).toMatchObject({
			user: initialUser,
		});
	});
});
