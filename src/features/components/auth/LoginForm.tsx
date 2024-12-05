import { useState } from "react";
import { Column } from "../../styles/Column.styled";
import Input from "../../ui/input/Input";
import Form from "../../ui/form/Form";
import { Row } from "../../styles/Row.styled";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/button/Button";
import AuthApi from "../../api/Auth.api";

const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async () => {
		setError("");
		setEmailError("");
		setPasswordError("");
		setIsLoading(true);
		try {
			if (!email) {
				setEmailError("Email is required to login.");
				return;
			}
			if (!password) {
				setPasswordError("Please enter your password.");
				return;
			}
			await AuthApi.login(email, password);
			navigate("/");
		} catch (err: any) {
			setError(
				"Login credentials are invalid. Please check email and/or password and try again."
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div style={{ maxWidth: "400px" }}>
			<Column $gap="3rem">
				<Row $justifyContent="center">
					<img
						src="/images/tepia-logo.svg"
						alt="Logo"
						width="100"
						height="100"
					/>
				</Row>
				<Column $gap="2rem">
					<Column>
						<h1 className="text-center">Welcome Back!</h1>
						<p className="text-center">
							Welcome back! Please enter your details.
						</p>
					</Column>
					<Form onSubmit={handleSubmit}>
						<Column $gap="1.5rem">
							<Input
								id="login-email"
								value={email || ""}
								onChange={(e) => setEmail(e.target.value)}
								label="Email"
								type="email"
								autoFocus
								error={emailError}
							/>
							<Input
								id="login-password"
								value={password || ""}
								onChange={(e) => setPassword(e.target.value)}
								label="Password"
								type="password"
								error={passwordError}
							/>
							<Row $justifyContent="flex-end">
								<Link to="/auth/forgot-password">
									Forgot Password
								</Link>
							</Row>
							{error && <p className="text-error">{error}</p>}
							<Button disabled={isLoading}>Sign In</Button>
						</Column>
					</Form>
				</Column>
			</Column>
		</div>
	);
};

export default LoginForm;
