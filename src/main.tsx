import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from '@/redux/store';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@/styles/base.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import mantineTheme from '@/configs/mantine';
import ProgressWrapper from '@/components/RouterProgress';
import ProtectedComp from '@/components/ProtectedComp';
import HomePage from '@/pages/home';
import IdeasPage from '@/pages/ideas';
import DetailIdeaPage from '@/pages/detail-idea';
import ErrorPage from '@/pages/error';
import RegisterPage from '@/pages/register';
import LoginPage from '@/pages/login';
import DetailUserPage from '@/pages/detail-user';
import LeaderboardsPage from '@/pages/leaderboards';
import UsersPage from '@/pages/users';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProgressWrapper>
				<HomePage />
			</ProgressWrapper>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: 'register',
		element: (
			<ProgressWrapper>
				<ProtectedComp notLogin>
					<RegisterPage />
				</ProtectedComp>
			</ProgressWrapper>
		),
	},
	{
		path: 'login',
		element: (
			<ProgressWrapper>
				<ProtectedComp notLogin>
					<LoginPage />
				</ProtectedComp>
			</ProgressWrapper>
		),
	},
	{
		path: 'ideas',
		element: (
			<ProgressWrapper>
				<IdeasPage />
			</ProgressWrapper>
		),
	},
	{
		path: 'ideas/tag/:ideaCategory',
		element: (
			<ProgressWrapper>
				<IdeasPage />
			</ProgressWrapper>
		),
	},
	{
		path: 'ideas/:ideaId',
		element: (
			<ProgressWrapper>
				<DetailIdeaPage />
			</ProgressWrapper>
		),
	},
	{
		path: 'leaderboards',
		element: (
			<ProgressWrapper>
				<LeaderboardsPage />
			</ProgressWrapper>
		),
	},
	{
		path: 'users',
		element: (
			<ProgressWrapper>
				<UsersPage />
			</ProgressWrapper>
		),
	},
	{
		path: 'users/:userId',
		element: (
			<ProgressWrapper>
				<DetailUserPage />
			</ProgressWrapper>
		),
	},
]);

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('site')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate
				loading={null}
				persistor={persistor}
			>
				<MantineProvider theme={mantineTheme}>
					<Notifications position='top-right' />
					<RouterProvider router={router} />
				</MantineProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
