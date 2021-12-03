import api from '../main/utils/api';

class SurveyService {
	getAll = async () => {
		try {
			const response = await api().get(`/surveys`);
			return response.data;
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
