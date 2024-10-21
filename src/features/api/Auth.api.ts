import axiosInstance from "./axios";

interface Login {
	id: string;
	email: string;
	role: string;
	accessToken: string;
}

class AuthApi {
	private endpoint = "/auth";
	private api = axiosInstance;

	login = async (email: string, password: string): Promise<Login> => {
		const response = await this.api.post(`${this.endpoint}/login`, {
			email,
			password,
		});
		return response.data;
	};

	refresh = async (): Promise<Login> => {
		const response = await this.api.post(`${this.endpoint}/refresh`);
		return response.data;
	};

	logout = async (): Promise<void> => {
		await this.api.post(`${this.endpoint}/logout`);
	};
}

export default new AuthApi();
