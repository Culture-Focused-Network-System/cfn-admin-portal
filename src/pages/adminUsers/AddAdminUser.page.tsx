import { useState } from "react";
import { EMPTY_USER, User } from "../../features/types/User.type";
import ControlBar from "../../features/components/controlBar/ControlBar";
import { Container } from "../../features/styles/Container.styled";
import Card from "../../features/ui/card/Card";
import { Row } from "../../features/styles/Row.styled";
import RoundedButton from "../../features/ui/roundedButton/RoundedButton";
import { Column } from "../../features/styles/Column.styled";
import { MenuItem, TextField } from "@mui/material";
import Form from "../../features/ui/form/Form";
import UsersApi from "../../features/api/Users.api";
import { useNavigate } from "react-router-dom";

const AddAdminUser = () => {
	const [user, setUser] = useState<User>(EMPTY_USER);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSaveClick = async () => {
		if (isLoading) return;
		try {
			setIsLoading(true);
			await UsersApi.create({ ...user });
			alert("User has been created.");
			navigate("/admin-users");
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	if (!user) {
		return <h2>Loading...</h2>;
	}

	return (
		<Form onSubmit={handleSaveClick}>
			<ControlBar>
				<h2>Admin User / Add User</h2>
			</ControlBar>
			<Container>
				<Card gap="2rem">
					<Row $justifyContent="space-between">
						<h2>New User</h2>
						<Row $gap="0.5rem">
							<RoundedButton filled>
								{isLoading ? "Adding..." : "Add"}
							</RoundedButton>
						</Row>
					</Row>
					<div style={{ width: "400px" }}>
						<Column $gap="1.5rem">
							<TextField
								variant="outlined"
								id="firstName"
								label="First Name"
								value={user.firstName || ""}
								onChange={(e) =>
									setUser({
										...user,
										firstName: e.target.value,
									})
								}
								required
							/>
							<TextField
								variant="outlined"
								id="lastName"
								label="Last Name"
								value={user.lastName || ""}
								onChange={(e) =>
									setUser({
										...user,
										lastName: e.target.value,
									})
								}
								required
							/>
							<TextField
								variant="outlined"
								id="email"
								label="Email"
								value={user.email || ""}
								onChange={(e) =>
									setUser({
										...user,
										email: e.target.value,
									})
								}
								type="email"
								required
							/>
							<TextField
								variant="outlined"
								id="phone"
								label="Phone"
								value={user.phoneNumber || ""}
								onChange={(e) =>
									setUser({
										...user,
										phoneNumber: e.target.value,
									})
								}
								required
							/>
							<TextField
								variant="outlined"
								id="status"
								select
								label="Status"
								value={user.status || ""}
								onChange={(e) =>
									setUser({
										...user,
										status:
											e.target.value === "Enabled"
												? "Enabled"
												: "Disabled",
									})
								}
								required
							>
								<MenuItem key="enabled" value="Enabled">
									Enabled
								</MenuItem>
								<MenuItem key="disabled" value="Disabled">
									Disabled
								</MenuItem>
							</TextField>
						</Column>
					</div>
				</Card>
			</Container>
		</Form>
	);
};

export default AddAdminUser;
