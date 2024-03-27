import { createSlice } from '@reduxjs/toolkit';

const userAccessToken = localStorage.getItem('userAccessToken')
	? localStorage.getItem('userAccessToken')
	: null;

const initialState = {
	accessToken: userAccessToken,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.user = action.payload.user;
			state.accessToken = action.payload.access_token;

			localStorage.setItem('userAccessToken', action.payload.access_token);
		}
	},
});

export default authSlice.reducer;

export const { setCredentials } = authSlice.actions;
