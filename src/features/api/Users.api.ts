import BaseApi from "./Base.api";

class UsersApi extends BaseApi {
	constructor() {
		super("/users");
	}
}

export default new UsersApi();
