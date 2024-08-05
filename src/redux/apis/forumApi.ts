import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/redux/store';
import { PayloadLogin, PayloadRegister } from '@/schema/auth';
import { PayloadCreateComment, PayloadCreateThread, PayloadVoteComment, PayloadVoteThread } from '@/schema/thread';

// Define a service using a base URL and expected endpoints
const forumApi = createApi({
	reducerPath: 'dicoding-forum',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://forum-api.dicoding.dev/v1',
		prepareHeaders: (headers, { getState }) => {
			const rootState = getState() as RootState;

			if (rootState.auth_user.auth.token) {
				headers.set('authorization', `Bearer ${rootState.auth_user.auth.token}`);
			}

			return headers;
		},
	}),
	tagTypes: ['Users', 'Threads'],
	endpoints: (builder) => ({
		getUser: builder.query<ResUser, void>({
			query: () => {
				return {
					url: '/users/me',
				};
			},
			transformErrorResponse: (response: { data: ResError; status: number }) => response.data,
		}),
		getUsers: builder.query<ResUsers, void>({
			query: () => '/users',
			providesTags: ['Users'],
			transformErrorResponse: (response: { data: ResError; status: number }) => response.data,
		}),
		registerUser: builder.mutation<ResRegister, PayloadRegister>({
			query: (body) => ({
				url: '/register',
				method: 'POST',
				body
			}),
			invalidatesTags: ['Users'],
			transformErrorResponse: (response: { data: ResError; status: number }) => response.data,
		}),
		loginUser: builder.mutation<ResLogin, PayloadLogin>({
			query: (body) => ({
				url: '/login',
				method: 'POST',
				body
			}),
			transformErrorResponse: (response: { data: ResError; status: number }) => response.data,
		}),
		getThreads: builder.query<ResThreads, void>({
			query: () => '/threads',
			providesTags: ['Threads'],
			transformErrorResponse: (response: { data: ResError; status: number }) => response.data,
		}),
		getThread: builder.query<
			ResThread,
			{
				id: string;
			}
		>({
			query: ({ id }) => `/threads/${id}`,
			providesTags: ['Threads'],
			transformErrorResponse: (response: { data: ResError; status: number }) => response.data,
		}),
		createThread: builder.mutation<ResCreateThread, PayloadCreateThread>({
			query: (body) => ({
				url: '/threads',
				method: 'POST',
				body
			}),
			invalidatesTags: ['Threads'],
			transformErrorResponse: (response: { data: ResError; status: number }) => response.data,
		}),
		getLeaderboards: builder.query<ResLeaderboards, void>({
			query: () => '/leaderboards',
			transformErrorResponse: (response: { data: ResError; status: number }) => response.data,
		}),
		createComment: builder.mutation<ResComment, PayloadCreateComment>({
			query: ({ content, threadId }) => ({
				url: `/threads/${threadId}/comments`,
				method: 'POST',
				body: {
					content,
				},
			}),
			invalidatesTags: ['Threads'],
			transformErrorResponse: (response: { data: ResError; status: number }) => response.data,
		}),
		postUpVoteThread: builder.mutation<ResVoteThread<UpVote>, PayloadVoteThread>({
			query: ({ threadId }) => ({
				url: `/threads/${threadId}/up-vote`,
				method: 'POST'
			}),
			invalidatesTags: ['Threads'],
			transformErrorResponse: (response: { data: ResError; status: number }) => response.data,
		}),
		postDownVoteThread: builder.mutation<ResVoteThread<DownVote>, PayloadVoteThread>({
			query: ({ threadId }) => ({
				url: `/threads/${threadId}/down-vote`,
				method: 'POST',
			}),
			invalidatesTags: ['Threads'],
			transformErrorResponse: (response: { data: ResError; status: number }) => response.data,
		}),
		postNeutralizeVoteThread: builder.mutation<ResVoteThread<NeutralizeVote>, PayloadVoteThread>({
			query: ({ threadId }) => ({
				url: `/threads/${threadId}/neutral-vote`,
				method: 'POST',
			}),
			invalidatesTags: ['Threads'],
			transformErrorResponse: (response: { data: ResError; status: number }) => response.data,
		}),
		postUpVoteComment: builder.mutation<ResVoteComment<UpVote>, PayloadVoteComment>({
			query: ({ threadId, commentId }) => ({
				url: `/threads/${threadId}/comments/${commentId}/up-vote`,
				method: 'POST',
			}),
			invalidatesTags: ['Threads'],
			transformErrorResponse: (response: { data: ResError; status: number }) => response.data,
		}),
		postDownVoteComment: builder.mutation<ResVoteComment<DownVote>, PayloadVoteComment>({
			query: ({ threadId, commentId }) => ({
				url: `/threads/${threadId}/comments/${commentId}/down-vote`,
				method: 'POST',
			}),
			invalidatesTags: ['Threads'],
			transformErrorResponse: (response: { data: ResError; status: number }) => response.data,
		}),
		postNeutralizeVoteComment: builder.mutation<ResVoteComment<NeutralizeVote>, PayloadVoteComment>({
			query: ({ threadId, commentId }) => ({
				url: `/threads/${threadId}/comments/${commentId}/neutral-vote`,
				method: 'POST',
			}),
			invalidatesTags: ['Threads'],
			transformErrorResponse: (response: { data: ResError; status: number }) => response.data,
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useLazyGetUserQuery,
	useLazyGetUsersQuery,
	useRegisterUserMutation,
	useLoginUserMutation,
	useLazyGetThreadsQuery,
	useLazyGetThreadQuery,
	useCreateThreadMutation,
	useLazyGetLeaderboardsQuery,
	useCreateCommentMutation,
	usePostUpVoteThreadMutation,
	usePostDownVoteThreadMutation,
	usePostNeutralizeVoteThreadMutation,
	usePostUpVoteCommentMutation,
	usePostDownVoteCommentMutation,
	usePostNeutralizeVoteCommentMutation,
} = forumApi;

export default forumApi;
