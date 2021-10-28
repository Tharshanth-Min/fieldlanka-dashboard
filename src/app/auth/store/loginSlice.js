import { createSlice } from '@reduxjs/toolkit';
import adminAuthService from '../../services/auth-service';

import { setUserData } from './userSlice';

export const submitAdminLogin = ({ username, password }) => async dispatch => {
	return adminAuthService
		.signInWithUserAndPassword(username, password)
		.then(username => {
			const user = {
				role: [username.role],
				from : 'Field Lanka',
				data: {
					displayName: username.user,
				},
				settings : {}
			};

			dispatch(setUserData(user));
			return dispatch(loginSuccess());
		})
		.catch(error => {
			return dispatch(loginError(error.logged_in_error));
		});
};


const initialState = {
	success: false,
	errors: {
		username: null,
		password: null
	}
};

const loginSlice = createSlice({
	name: 'auth/login',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.success = true;
		},
		loginError: (state, action) => {
			state.success = false;
			state.error = action.payload;
		}
	},
	extraReducers: {}
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
