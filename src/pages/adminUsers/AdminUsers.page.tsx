import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../features/types/User.type";
import {
	MaterialReactTable,
	MRT_ColumnDef,
	useMaterialReactTable,
} from "material-react-table";
import ControlBar from "../../features/components/controlBar/ControlBar";
import RoundedButton from "../../features/ui/roundedButton/RoundedButton";
import { Container } from "../../features/styles/Container.styled";
import Tabs from "../../features/ui/tabs/Tabs";
import { Row } from "../../features/styles/Row.styled";
import UsersApi from "../../features/api/Users.api";
import { downloadCsv } from "../../features/utils/exportHelpers";
import { formatDateTime } from "../../features/utils/formatDateTime";

const columns: MRT_ColumnDef<User>[] = [
	{
		accessorKey: "firstName",
		header: "First Name",
	},
	{
		accessorKey: "lastName",
		header: "Last Name",
	},
	{
		accessorKey: "email",
		header: "Email",
		size: 250,
	},
	{
		accessorKey: "phoneNumber",
		header: "Phone",
	},
	{
		accessorKey: "updatedAt",
		header: "Last Active",
	},
];

const AdminUsersPage = () => {
	const navigate = useNavigate();
	const [tab, setTab] = useState("Active");
	const [data, setData] = useState<User[]>([]);
	const table = useMaterialReactTable({
		columns,
		data,
		muiTableBodyRowProps: ({ row }) => ({
			onClick: () => {
				const { original: data } = row;
				navigate(`${data._id}`);
			},
			sx: {
				cursor: "pointer",
			},
		}),
	});

	const fetchAdminUsers = async () => {
		try {
			const users = await UsersApi.getAll({
				role: "Admin",
				status: tab === "Active" ? "Enabled" : "Disabled",
			});
			setData(
				users.map((user: User) => ({
					...user,
					createdAt: formatDateTime(user.createdAt),
					updatedAt: formatDateTime(user.updatedAt),
				}))
			);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchAdminUsers();
	}, [tab]);

	const handleExport = () => {
		const users = data.map((user: User) => ({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			username: user.username,
			email: user.email,
			phoneNumber: user.phoneNumber,
			status: user.status,
			lastActive: user.updatedAt,
			signUp: user.createdAt,
		}));
		downloadCsv(users, "admin-users");
	};

	return (
		<>
			<ControlBar>
				<h2>Admin Users</h2>
				<Row $gap="0.5rem">
					<RoundedButton onClick={handleExport}>Export</RoundedButton>
					<RoundedButton filled onClick={() => navigate("add")}>
						Add User
					</RoundedButton>
				</Row>
			</ControlBar>
			<Container>
				<Tabs
					tabs={["Active", "Inactive"]}
					activeTab={tab}
					onTabSelect={(value) => setTab(value)}
				/>
				<MaterialReactTable table={table} />
			</Container>
		</>
	);
};

export default AdminUsersPage;
