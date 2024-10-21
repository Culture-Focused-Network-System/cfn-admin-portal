import { useNavigate } from "react-router-dom";
import { Column } from "../../features/styles/Column.styled";
import { Container } from "../../features/styles/Container.styled";
import { Modal } from "../../features/styles/Modal.styled";
import Button from "../../features/ui/button/Button";
import { useEffect } from "react";

const UnauthorizedRoot = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate("/auth/login");
		}, 5000);
	});

	const handleClick = () => {
		navigate("/auth/login");
	};

	return (
		<Modal>
			<Container $gap="2rem">
				<Column $gap="0.5rem">
					<h1 className="text-center">Unauthorized</h1>
					<p className="text-center">
						You do not have permission to access this site. You will
						be rerouted shortly.
					</p>
				</Column>
				<Button onClick={handleClick}>Back to Login Page</Button>
			</Container>
		</Modal>
	);
};

export default UnauthorizedRoot;
