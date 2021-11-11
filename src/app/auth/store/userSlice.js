import { createSlice } from '@reduxjs/toolkit';
import history from '@history';
import _ from '@lodash';
import { setInitialSettings, setDefaultSettings } from 'app/store/fuse/settingsSlice';
import authService from '../../services/auth-service';


export const setUserData = user => async (dispatch, getState) => {
	history.location.state = {
		redirectUrl: user.redirectUrl // for example 'apps/academy'
	};

	dispatch(setDefaultSettings(user.data.settings));

	dispatch(setUser(user));
};

export const setTotSurveys = (total) => async (dispatch) => {
	dispatch(setTotalSurveys(total));
};

export const updateUserSettings = settings => async (dispatch, getState) => {
	const oldUser = getState().auth.user;
	const user = _.merge({}, oldUser, { data: { settings } });

	//dispatch(updateUserData(user));

	return dispatch(setUserData(user));
};

export const updateUserShortcuts = shortcuts => async (dispatch, getState) => {
	const { user } = getState().auth;
	const newUser = {
		...user,
		data: {
			...user.data,
			shortcuts
		}
	};

	return dispatch(setUserData(newUser));
};

export const logoutUser = () => async (dispatch, getState) => {
	const { user } = getState().auth;

	history.push({
		pathname: '/'
	});

	if (user.from === 'Field Lanka') {
		authService.logout();
	}

	dispatch(setInitialSettings());

	return dispatch(userLoggedOut());
};



const initialState = {
	role: [], // guest
	totalSurveys : 0,
	data: {
		numOfSurveys : 0,
		displayName: 'John Doe',
		photoURL: 'assets/images/avatars/profile.jpg',
		email: 'johndoe@withinpixels.com',
		shortcuts: ['calendar', 'mail', 'contacts', 'todo']
	}
};

const userSlice = createSlice({
	name: 'auth/user',
	initialState,
	reducers: {
		setUser: (state, action) => action.payload,
		setTotalSurveys: (state, action) => {
			state.totalSurveys = action.payload
		},
		userLoggedOut: (state, action) => initialState
	},
	extraReducers: {}
});

export const { setUser, userLoggedOut, setTotalSurveys } = userSlice.actions;

export default userSlice.reducer;
