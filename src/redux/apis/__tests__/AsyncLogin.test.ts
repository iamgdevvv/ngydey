import { describe, it, expect, afterEach, vi } from 'vitest';
import store from '@/redux/store';
import forumApi from '@/redux/apis/forumApi';
import { faker } from '@faker-js/faker';

const payload = {
	email: faker.internet.email(),
	password: faker.internet.password(),
};

describe('asyncLogin thunk', () => {
	afterEach(() => {
		store.dispatch(forumApi.util.resetApiState());
	});

	it('should dispatch action correctly when data fetching is success/fullfilled', async () => {
		const dispatchFn = vi.fn;

		const loginUser = forumApi.endpoints.loginUser.initiate(payload);

		const query = await loginUser(dispatchFn, store.getState, null);

		console.log({ query });
		// expect(query.error).
	});
});
