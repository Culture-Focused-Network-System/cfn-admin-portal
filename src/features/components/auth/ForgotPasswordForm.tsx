import { useState } from "react";
import { Column } from "../../styles/Column.styled";
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";
import { Row } from "../../styles/Row.styled";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import Form from "../../ui/form/Form";
import KeyIcon from "./KeyIcon";

const ForgotPasswordForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");

	const handleSubmit = async () => {
		try {
			setIsLoading(true);
		} catch (err: any) {
			console.log(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div style={{ maxWidth: "400px" }}>
			<Column $gap="2rem">
				<Row $justifyContent="center">
					<KeyIcon />
				</Row>
				<Column>
					<h1 className="text-center">Forgot Password?</h1>
					<p className="text-center">
						No worries, we'll send you reset instructions.
					</p>
				</Column>
				<Form onSubmit={handleSubmit}>
					<Column>
						<Input
							id="forgot-email"
							value={email || ""}
							onChange={(e) => setEmail(e.target.value)}
							label="Email"
							type="email"
							autoFocus
							required
						/>
						<Button disabled={isLoading}>Continue</Button>
						<Link to="/auth/login" className="text-primary">
							<Row $justifyContent="center" $gap="0.5rem">
								<MdArrowBack />
								<p>Back to log in</p>
							</Row>
						</Link>
					</Column>
				</Form>
			</Column>
		</div>
	);
};

export default ForgotPasswordForm;
