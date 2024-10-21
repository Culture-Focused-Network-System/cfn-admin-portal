import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../features/types/User.type";
import ControlBar from "../../features/components/controlBar/ControlBar";
import { Container } from "../../features/styles/Container.styled";
import Card from "../../features/ui/card/Card";
import { Row } from "../../features/styles/Row.styled";
import RoundedButton from "../../features/ui/roundedButton/RoundedButton";
import { Column } from "../../features/styles/Column.styled";
import { MenuItem, TextField } from "@mui/material";
import Form from "../../features/ui/form/Form";
import { MdArrowBack } from "react-icons/md";
import UsersApi from "../../features/api/Users.api";

const AdminUserPage = () => {
	const { userId } = useParams();
	const navigate = useNavigate();
	const [user, setUser] = useState<User | null>(null);
	const [canEdit, setCanEdit] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const fetchUser = async () => {
		if (!userId) return;
		try {
			setIsLoading(true);
			const data = await UsersApi.getById(userId);
			setUser(data);
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!userId) {
			navigate("/mobile-users");
		}
		fetchUser();
	}, []);

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
			await UsersApi.update(userId, user);
			await handleEditClick();
			alert("User has been saved.");
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
				<Row $gap="0.5rem">
					<MdArrowBack
						className="clickable"
						onClick={() => navigate(-1)}
					/>
					<h2>Admin User</h2>
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
							{canEdit ? (
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
										<p className="text-xs">Phone</p>
										<p>{user.phoneNumber}</p>
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

export default AdminUserPage;
