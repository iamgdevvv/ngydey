/* eslint-disable  @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeAll, Mock, afterEach, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';
import { errorMockResponse, loginMockResponse } from '@/helper/mock-responses';
import store from '@/redux/store';
import forumApi from '@/redux/apis/forumApi';
import { ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
	MutationActionCreatorResult,
	MutationDefinition,
} from '@reduxjs/toolkit/query';
import { PayloadLogin } from '@/schema/auth';

const payload = {
	email: faker.internet.email(),
	password: faker.internet.password(),
};

describe('loginUser Thunk', () => {
	let dispatchFn: Mock<
		ThunkAction<
			MutationActionCreatorResult<
				MutationDefinition<
					PayloadLogin,
					BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
					'Users' | 'Threads',
					ResLogin,
					'dicoding-forum'
				>
			>,
			any,
			any,
			UnknownAction
		>
	>;

	beforeAll(() => {
		const loginUser = forumApi.endpoints.loginUser.initiate(payload);
		dispatchFn = vi.fn(loginUser);
	});

	beforeEach(() => {
		dispatchFn.mockReset();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('Should dispatch action correctly when data fetching is fullfilled', async () => {
		const queryMock = await store.dispatch(dispatchFn.mockResolvedValue({ data: loginMockResponse }));

		expect(dispatchFn).toHaveBeenCalledTimes(1);

		expect(queryMock.data).equal(loginMockResponse);
	});

	it('Should dispatch action correctly when data fetching is rejected', async () => {
		const queryMock = await store.dispatch(dispatchFn.mockResolvedValue({ error: errorMockResponse }));

		expect(dispatchFn).toHaveBeenCalledTimes(1);

		expect(queryMock.error).equal(errorMockResponse);
	});

	it('Should dispatch action not correctly', async () => {
		try {
			await store.dispatch(dispatchFn.mockRejectedValue(errorMockResponse));
		} catch (mockError) {
			expect(mockError).equal(errorMockResponse);
		}
	});
});
