import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export default function api() {
	const api = axios.create({
		baseURL: API_URL,
	});

	api.interceptors.request.use(
		async config => {
			const token = await window.localStorage.getItem('fieledlanka_access_token');
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		error => {
			return Promise.reject(error);
		},
	);

	api.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
				//window.location.href = `logout`;
				return Promise.reject();
			}
			return Promise.reject(error);
		}
	);

	return api;
}
