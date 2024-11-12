import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../features/styles/Container.styled";
import Card from "../../features/ui/card/Card";
import { useEffect, useState } from "react";
import { User } from "../../features/types/User.type";
import { Row } from "../../features/styles/Row.styled";
import RoundedButton from "../../features/ui/roundedButton/RoundedButton";
import { Column } from "../../features/styles/Column.styled";
import { MenuItem, TextField } from "@mui/material";
import ControlBar from "../../features/components/controlBar/ControlBar";
import Form from "../../features/ui/form/Form";
import { MdArrowBack } from "react-icons/md";
import UsersApi from "../../features/api/Users.api";

const MobileUserPage = () => {
	const { userId } = useParams();
	const navigate = useNavigate();
	const [user, setUser] = useState<User | null>(null);
	const [userError, setUserError] = useState("");
	const [canEdit, setCanEdit] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const fetchUser = async () => {
		try {
			const data = await UsersApi.getById(userId || "");
			setUser(data);
		} catch (err: any) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (!userId) {
			navigate("/mobile-users");
		}
		fetchUser();
	}, []);

	const handleRemoveImage = () => {
		console.log("TODO: handle remove image");
	};

	const handleEditClick = async () => {
		try {
			if (canEdit) {
				setCanEdit(false);
				await fetchUser();
			} else {
				setCanEdit(true);
			}
		} catch (err: any) {
			console.log(err.message);
		}
	};

	const handleSaveClick = async () => {
		if (isLoading || !userId || !user) return;
		try {
			setIsLoading(true);
			setUserError("");

			if (!user.firstName) {
				setUserError("First name is required.");
				return;
			}
			if (!user.lastName) {
				setUserError("Last name is required.");
				return;
			}
			if (!user.email) {
				setUserError("Email is required.");
				return;
			}
			if (!user.username) {
				setUserError("Username is required.");
				return;
			}

			await UsersApi.update(userId, user);
			await handleEditClick();
			alert("User has been updated.");
		} catch (err: any) {
			console.log(err.message);
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
				<Row $gap="0.5rem">
					<MdArrowBack
						className="clickable"
						onClick={() => navigate(-1)}
					/>
					<h2>Mobile User</h2>
				</Row>
			</ControlBar>
			<Container>
				<Card gap="2rem">
					<Row $justifyContent="space-between">
						<h2>About</h2>
						<Row $gap="0.5rem">
							{canEdit && (
								<RoundedButton filled>
									{isLoading ? "Saving..." : "Save"}
								</RoundedButton>
							)}
							<RoundedButton
								type="button"
								onClick={handleEditClick}
							>
								{canEdit ? "Cancel" : "Edit"}
							</RoundedButton>
						</Row>
					</Row>
					<div style={{ width: "400px" }}>
						<Column $gap="2rem">
							<Column>
								<img
									style={{
										width: "160px",
										height: "160px",
										borderRadius: "100px",
										objectFit: "cover",
									}}
									src="https://heroshotphotography.com/wp-content/uploads/2023/03/male-linkedin-corporate-headshot-on-white-square-1024x1024.jpg"
									alt="Headshot"
								/>
								{canEdit && (
									<RoundedButton onClick={handleRemoveImage}>
										Remove Image
									</RoundedButton>
								)}
							</Column>
							{canEdit ? (
								<Column $gap="1.5rem">
									{userError && (
										<p className="text-error">
											{userError}
										</p>
									)}
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
									/>
									<TextField
										variant="outlined"
										id="username"
										label="Username"
										value={user.username || ""}
										onChange={(e) =>
											setUser({
												...user,
												username: e.target.value,
											})
										}
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
										<MenuItem
											key="disabled"
											value="Disabled"
										>
											Disabled
										</MenuItem>
									</TextField>
								</Column>
							) : (
								<Column>
									<Column $gap="0.25rem">
										<p className="text-xs">First Name</p>
										<p>{user.firstName}</p>
									</Column>
									<Column $gap="0.25rem">
										<p className="text-xs">Last Name</p>
										<p>{user.lastName}</p>
									</Column>
									<Column $gap="0.25rem">
										<p className="text-xs">Email</p>
										<p>{user.email}</p>
									</Column>
									<Column $gap="0.25rem">
										<p className="text-xs">Username</p>
										<p>@{user.username}</p>
									</Column>
									<Column $gap="0.25rem">
										<p className="text-xs">Status</p>
										<p>{user.status}</p>
									</Column>
								</Column>
							)}
						</Column>
					</div>
				</Card>
			</Container>
		</Form>
	);
};

export default MobileUserPage;
