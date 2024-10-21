import LoginForm from "../../features/components/auth/LoginForm";
import { Modal } from "../../features/styles/Modal.styled";

const LoginPage = () => {
	return (
		<Modal>
			<LoginForm />
		</Modal>
	);
};

export default LoginPage;
