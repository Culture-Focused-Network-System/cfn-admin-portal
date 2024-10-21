export const generatePassword = (length: number = 32): string => {
	const charset =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:',.<>?";
	let password = "";

	const randomValues = new Uint8Array(length);
	window.crypto.getRandomValues(randomValues);

	for (let i = 0; i < length; i++) {
		password += charset[randomValues[i] % charset.length];
	}

	return password;
};
