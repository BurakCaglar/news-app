import { configureStore } from '@reduxjs/toolkit';
import newsSlice from './news/newsSlice';
import authSlice from './auth/authSlice';
import { injectStore } from '../utils/axiosConfig';

const store = configureStore({
	reducer: {
		auth: authSlice,
		news: newsSlice,
	}
});

injectStore(store);

export default store;
