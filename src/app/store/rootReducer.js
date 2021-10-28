import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import fuse from './fuse';
import i18n from './i18nSlice';
import fieldlanka from 'app/main/store'

const createReducer = asyncReducers =>
	combineReducers({
		auth,
		fuse,
		fieldlanka,
		i18n,
		...asyncReducers
	});

export default createReducer;
