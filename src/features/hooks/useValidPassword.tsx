import { useEffect, useState } from "react";

export interface PasswordStatus {
	hasLowercase: boolean;
	hasUppercase: boolean;
	hasNumber: boolean;
	hasLength: boolean;
}

const useValidPassword = (password: string) => {
	const [passwordStatus, setPasswordStatus] = useState<PasswordStatus>({
		hasLowercase: false,
		hasUppercase: false,
		hasNumber: false,
		hasLength: false,
	});

	useEffect(() => {
		const hasLowercase = /[a-z]/.test(password);
		const hasUppercase = /[A-Z]/.test(password);
		const hasNumber = /\d/.test(password);
		const hasLength = password.length >= 6;

		setPasswordStatus({
			hasLowercase,
			hasUppercase,
			hasNumber,
			hasLength,
		});
	}, [password]);

	return passwordStatus;
};

export default useValidPassword;
