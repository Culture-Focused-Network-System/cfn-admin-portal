import axios from "axios";
import { BACKEND_URL } from "../../constants";
import { RootState, store } from "../app/store";

const axiosInstance = axios.create({
	baseURL: BACKEND_URL,
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const state: RootState = store.getState();
		const accessToken = state.auth.accessToken;

		if (accessToken) {
			config.headers["authorization"] = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export default axiosInstance;
