import { User } from "./User.type";

export interface Community {
	_id?: string;
	type: "Main" | "Sub" | "Needs Review";
	name: string;
	profilePicture?: string;
	topic?: string;
	nationality?: string;
	ethnicity?: string;
	language?: string;
	bio?: string;
	creator: string | User;
	status: "Enabled" | "Disabled";
	members: string[] | User[];
	createdAt?: string;
	updatedAt?: string;
}

export const Empty_Community: Community = {
	type: "Main",
	name: "",
	profilePicture: "",
	topic: "",
	nationality: "",
	ethnicity: "",
	language: "",
	bio: "",
	creator: "",
	status: "Enabled",
	members: [],
};
