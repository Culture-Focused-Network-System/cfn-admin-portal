import { ChangeEvent, useState } from "react";
import { Column } from "../../styles/Column.styled";
import { Row } from "../../styles/Row.styled";
import Form from "../../ui/form/Form";
import KeyIcon from "./KeyIcon";
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import useQueryParam from "../../hooks/useQueryParam";
import useValidPassword, { PasswordStatus } from "../../hooks/useValidPassword";

const SetPasswordForm = () => {
	const token = useQueryParam("token");
	const [isLoading, setIsLoading] = useState(false);
	const [password, setPassword] = useState("");
	const passwordStatus = useValidPassword(password);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	const [error, setError] = useState("");

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);
		setPasswordError("");
		if (!/[a-z]/.test(value)) {
			setPasswordError(
				"Password must contain at least one lowercase character."
			);
			return;
		}
		if (!/[A-Z]/.test(value)) {
			setPasswordError(
				"Password must contain at least one uppercase character."
			);
			return;
		}
		if (!/\d/.test(value)) {
			setPasswordError("Password must contain at least one number.");
			return;
		}
		if (value.length < 6) {
			setPasswordError("Password must contain at least 6 characters.");
			return;
		}
	};

	const handleSubmit = async () => {
		setError("");
		setIsLoading(true);

		try {
			if (
				!passwordStatus.hasLowercase ||
				!passwordStatus.hasUppercase ||
				!passwordStatus.hasNumber ||
				!passwordStatus.hasLength
			) {
				setError(
					"Please make sure the password meets all of the criteria."
				);
				return;
			}
			if (password !== confirmPassword) {
				setError("Passwords do not match.");
				return;
			}
			console.log({ token, password });
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
					<h1 className="text-center">Set New Password</h1>
					<p className="text-center">
						Your new password must be different than previously used
						passwords.
					</p>
				</Column>
				<Form onSubmit={handleSubmit}>
					<Column>
						<Input
							id="password"
							value={password || ""}
							onChange={handlePasswordChange}
							label="Password"
							type="password"
							autoFocus
							error={passwordError}
						/>
						<AssistivePassword passwordStatus={passwordStatus} />
						<Input
							id="confirm-password"
							value={confirmPassword || ""}
							onChange={(e) => setConfirmPassword(e.target.value)}
							label="Confirm Password"
							type="password"
							error={confirmPasswordError}
						/>
						{error && <p className="text-error">{error}</p>}
						<Button disabled={isLoading}>Set Password</Button>
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

const AssistivePassword = ({
	passwordStatus,
}: {
	passwordStatus: PasswordStatus;
}) => {
	return (
		<Column $gap="0">
			<p
				className={
					passwordStatus.hasLowercase ? "text-success" : "text-error"
				}
			>
				At least 1 lowercase letter
			</p>
			<p
				className={
					passwordStatus.hasUppercase ? "text-success" : "text-error"
				}
			>
				At least 1 UPPERCASE letter
			</p>
			<p
				className={
					passwordStatus.hasNumber ? "text-success" : "text-error"
				}
			>
				At least 1 number
			</p>
			<p
				className={
					passwordStatus.hasLength ? "text-success" : "text-error"
				}
			>
				At least 6 characters
			</p>
		</Column>
	);
};

export default SetPasswordForm;
