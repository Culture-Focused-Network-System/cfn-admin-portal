import BaseApi from "./Base.api";

class ReportsApi extends BaseApi {
	constructor() {
		super("/reports");
	}
}

export default new ReportsApi();
