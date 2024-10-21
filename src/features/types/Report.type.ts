import { User } from "./User.type";

export interface Report {
	_id?: string;
	reportedItem: "Post" | "Comment" | "Profile";
	issue: string;
	reportedBy: string | User;
	reportedUser: string | User;
	reportedItemId: string;
	status: "Not Viewed" | "Resolved" | "Unresolved";
	createdAt?: string;
	updatedAt?: string;
}
