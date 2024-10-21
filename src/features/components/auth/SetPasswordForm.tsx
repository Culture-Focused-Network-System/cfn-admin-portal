import { useState } from "react";
import { Column } from "../../styles/Column.styled";
import { Row } from "../../styles/Row.styled";
import Form from "../../ui/form/Form";
import KeyIcon from "./KeyIcon";
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import useQueryParam from "../../hooks/useQueryParam";

const SetPasswordForm = () => {
	const token = useQueryParam("token");
	const [isLoading, setIsLoading] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async () => {
		try {
			setError("");
			setIsLoading(true);
			if (password !== confirmPassword) {
				setError("Passwords do not match.");
				return;
			}

			console.log({ token, password, confirmPassword });
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
							onChange={(e) => setPassword(e.target.value)}
							label="Password"
							type="password"
							autoFocus
							required
						/>
						<Input
							id="confirm-password"
							value={confirmPassword || ""}
							onChange={(e) => setConfirmPassword(e.target.value)}
							label="Confirm Password"
							type="password"
							required
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

export default SetPasswordForm;
