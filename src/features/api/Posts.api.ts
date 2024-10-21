import BaseApi from "./Base.api";

class PostsApi extends BaseApi {
	constructor() {
		super("/posts");
	}
}

export default new PostsApi();
