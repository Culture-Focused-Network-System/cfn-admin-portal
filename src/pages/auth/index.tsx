import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./Login.page";
import ForgotPasswordPage from "./ForgotPassword.page";
import SetPasswordPage from "./SetPassword.page";

const AuthRoot = () => {
	return (
		<Routes>
			<Route index element={<Navigate to="login" />} />
			<Route path="login" element={<LoginPage />} />
			<Route path="forgot-password" element={<ForgotPasswordPage />} />
			<Route path="set-password" element={<SetPasswordPage />} />
			<Route path="*" element={<Navigate to="login" />} />
		</Routes>
	);
};

export default AuthRoot;
