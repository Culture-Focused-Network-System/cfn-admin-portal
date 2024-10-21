import { Comment } from "./Comment.type";
import { Community } from "./Community.type";
import { User } from "./User.type";

export interface Post {
	title: string;
	body: string;
	community: string | Community;
	postedBy: string | User;
	contentType?: "Image" | "Video";
	content?: string;
	likes: string[] | User[];
	comments: string[] | Comment[];
	status: "Enabled" | "Disabled";
	createdAt?: string;
	updatedAt?: string;
}

export const Empty_Post: Post = {
	title: "",
	body: "",
	community: "",
	postedBy: "",
	contentType: undefined,
	content: "",
	likes: [],
	comments: [],
	status: "Enabled",
};
