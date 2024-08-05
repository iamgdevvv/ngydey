import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import authUserReducer from '@/redux/reducers/auth-user';
import forumApi from '@/redux/apis/forumApi';

const reducers = combineReducers({
	[authUserReducer.name]: authUserReducer.reducer,
	[forumApi.reducerPath]: forumApi.reducer,
});

const persistConfig = {
	key: 'ngydeyy_v1.0.01',
	storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(forumApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
