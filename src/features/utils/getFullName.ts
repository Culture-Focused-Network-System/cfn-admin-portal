import { User } from "../types/User.type";

export const getFullName = (user: User) => {
	return `${user?.firstName || ""} ${user?.lastName || ""}`;
};
