import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query/react';
import {authApi} from './services/authApi';
import userAuthReducer from './slices/authSlice';

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		userAuth: userAuthReducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat([authApi.middleware])
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
