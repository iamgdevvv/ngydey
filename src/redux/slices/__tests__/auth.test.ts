import { describe, it, expect } from 'vitest';
import authSlice, { initialAuth, removeAuth } from '@/redux/slices/auth';

describe('Auth Slice', () => {
	it('Initial state', async () => {
		expect(authSlice.getInitialState()).toMatchObject({
			auth: initialAuth,
		});
	});

	it('removeAuth State', async () => {
		expect(authSlice.reducer(undefined, removeAuth())).toMatchObject({
			auth: initialAuth,
		});
	})
});
