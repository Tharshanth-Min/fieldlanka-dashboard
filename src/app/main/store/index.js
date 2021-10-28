import { combineReducers } from '@reduxjs/toolkit';
import surveys from "./surveysSlice"

const reducer = combineReducers({
	surveys
});

export default reducer;
