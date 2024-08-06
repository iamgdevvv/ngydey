import { faker } from '@faker-js/faker';

const threadsMockResponse = {
	status: 'success',
	message: 'ok',
	data: {
		threads: [
			{
				id: faker.database.mongodbObjectId(),
				title: faker.lorem.lines(1),
				body: faker.lorem.paragraph(),
				category: faker.lorem.word(),
				createdAt: faker.date.anytime().toISOString(),
				ownerId: faker.database.mongodbObjectId(),
				upVotesBy: [faker.database.mongodbObjectId(), faker.database.mongodbObjectId()],
				downVotesBy: [faker.database.mongodbObjectId()],
				totalComments: faker.number.int(),
			},
		],
	},
};

const usersMockResponse = {
	status: 'success',
	message: 'ok',
	data: {
		users: [
			{
				id: faker.database.mongodbObjectId(),
				name: faker.internet.displayName(),
				email: faker.internet.email(),
				avatar: faker.image.avatar(),
			},
		],
	},
};

const detailThreadMockResponse = {
	status: 'success',
	message: 'ok',
	data: {
		detailThread: {
			id: faker.database.mongodbObjectId(),
			title: faker.lorem.lines(1),
			body: faker.lorem.paragraph(),
			category: faker.lorem.word(),
			createdAt: faker.date.anytime().toISOString(),
			owner: {
				id: faker.database.mongodbObjectId(),
				name: faker.internet.displayName(),
				avatar: faker.image.avatar(),
			},
			upVotesBy: [faker.database.mongodbObjectId(), faker.database.mongodbObjectId()],
			downVotesBy: [faker.database.mongodbObjectId()],
			comments: [
				{
					id: faker.database.mongodbObjectId(),
					content: faker.lorem.paragraph(),
					createdAt: faker.date.anytime().toISOString(),
					owner: {
						id: faker.database.mongodbObjectId(),
						name: faker.internet.displayName(),
						avatar: faker.image.avatar(),
					},
					upVotesBy: [faker.database.mongodbObjectId(), faker.database.mongodbObjectId()],
					downVotesBy: [faker.database.mongodbObjectId()],
				},
			],
		},
	},
};

const leaderboardsMockResponse = {
	status: 'success',
	message: 'ok',
	data: {
		leaderboards: [
			{
				user: {
					id: faker.database.mongodbObjectId(),
					name: faker.internet.displayName(),
					email: faker.internet.email(),
					avatar: faker.image.avatar(),
				},
				score: faker.number.int(),
			},
		],
	},
};

const loginMockResponse = {
	status: 'success',
	message: 'ok',
	data: {
		token: faker.string.uuid(),
	},
};

const registerMockResponse = {
	status: 'success',
	message: 'ok',
	data: {
		user: {
			id: faker.database.mongodbObjectId(),
			name: faker.internet.displayName(),
			email: faker.internet.email(),
			avatar: faker.image.avatar(),
		},
	},
};

const errorMockResponse = {
	status: 'error',
	message: 'Not Foundqq',
	data: {},
};

export {
	threadsMockResponse,
	usersMockResponse,
	detailThreadMockResponse,
	leaderboardsMockResponse,
	loginMockResponse,
	registerMockResponse,
	errorMockResponse,
};
