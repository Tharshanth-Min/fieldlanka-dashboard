import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const surveysAdapter = createEntityAdapter({});

const surveysSlice = createSlice({
	name: 'fieldlanka/surveys',
	initialState: surveysAdapter.getInitialState({
		searchText: '',
		searchTextPE : '',
		surveyFound : false,
	}),
	reducers: {
		refreshSearchText: (state) => {
			state.searchTextPE  = "";
			state.searchText  = "";
			state.surveyFound  = false;
		},

		setSurveySearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		setSurveySearchPEText: {
			reducer: (state, action) => {
				state.searchTextPE = action.payload;
			},
			prepare: event => ({ payload: event || '' })
		},
		setSurveyFound: {
			reducer: (state, action) => {
				state.surveyFound = action.payload;
			},
			prepare: event => ({ payload: event || false })
		}
	},
	extraReducers: {}
});

export const { setSurveySearchText, refreshSearchText} = surveysSlice.actions;

export default surveysSlice.reducer;
