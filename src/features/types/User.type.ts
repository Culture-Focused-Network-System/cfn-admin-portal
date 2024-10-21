export type User = {
	_id?: string;
	email: string;
	password?: string;
	role?: "Admin" | "Mobile";
	firstName?: string;
	lastName?: string;
	username?: string;
	phoneNumber?: string;
	status?: "Enabled" | "Disabled";
	profilePicture?: string;
	nationality?: string;
	ethnicity?: string;
	bio?: string;
	followers?: string[];
	following?: string[];
	blockedAccounts?: string[];
	refreshToken?: string;
	resetToken?: string;
	resetTokenExpiry?: Date;
	createdAt?: string;
	updatedAt?: string;
};

export const EMPTY_USER: User = {
	email: "",
	role: "Admin",
	firstName: "",
	lastName: "",
	phoneNumber: "",
	status: "Enabled",
};
