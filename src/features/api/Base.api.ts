import axiosInstance from "./axios";

class BaseApi {
	public endpoint = "";
	public api = axiosInstance;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	async create(data: Object) {
		const response = await this.api.post(`${this.endpoint}`, data);
		return response.data;
	}

	async getAll(query?: Object) {
		const response = await this.api.get(`${this.endpoint}`, {
			params: query,
		});
		return response.data;
	}

	async getById(id: string) {
		const response = await this.api.get(`${this.endpoint}/${id}`);
		return response.data;
	}

	async update(id: string, data: Object) {
		const response = await this.api.put(`${this.endpoint}/${id}`, data);
		return response.data;
	}

	async delete(id: string) {
		const response = await this.api.delete(`${this.endpoint}/${id}`);
		return response.data;
	}
}

export default BaseApi;
