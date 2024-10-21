import { User } from "./User.type";

export interface Comment {
	user: string | User;
	message: string;
	likes: string[] | User[];
	replies: string[] | Comment[];
	createdAt?: string;
	updatedAt?: string;
}

export const Empty_Comment: Comment = {
	user: "",
	message: "",
	likes: [],
	replies: [],
};
