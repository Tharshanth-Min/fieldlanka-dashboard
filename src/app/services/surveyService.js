import api from '../main/utils/api';

class SurveyService {
	getAll = async (rowsPerPage, page, searchText) => {
		try {
			const response = await api().get(
				`/surveys?per_page=${rowsPerPage}&page=${parseInt(page) + 1}&search_query=${searchText}`
			);
			const { data, meta } = await response.data;
			const object = { data, meta };
			return object;
		} catch (error) {
			throw error;
		}
	};

	downloadSurvey = async files => {
		try {
			const response = await api().get(`/download-surveys?surveys=${files}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	};
}

export default new SurveyService();
