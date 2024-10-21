import BaseApi from "./Base.api";

class CommunitiesApi extends BaseApi {
	constructor() {
		super("/communities");
	}
}

export default new CommunitiesApi();
