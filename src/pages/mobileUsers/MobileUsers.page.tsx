import {
	MaterialReactTable,
	MRT_ColumnDef,
	useMaterialReactTable,
} from "material-react-table";
import { User } from "../../features/types/User.type";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ControlBar from "../../features/components/controlBar/ControlBar";
import RoundedButton from "../../features/ui/roundedButton/RoundedButton";
import Tabs from "../../features/ui/tabs/Tabs";
import { Container } from "../../features/styles/Container.styled";
import UsersApi from "../../features/api/Users.api";
import { formatDateTime } from "../../features/utils/formatDateTime";
import { downloadCsv } from "../../features/utils/exportHelpers";

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
		accessorKey: "username",
		header: "Username",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "updatedAt",
		header: "Last Active",
	},
	{
		accessorKey: "createdAt",
		header: "Sign Up",
	},
];

const MobileUsersPage = () => {
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

	const fetchMobileUsers = async () => {
		try {
			const users = await UsersApi.getAll({
				role: "Mobile",
				status: tab === "Active" ? "Enabled" : "Disabled",
			});
			setData(
				users.map((user: User) => ({
					...user,
					createdAt: formatDateTime(user.createdAt),
					updatedAt: formatDateTime(user.updatedAt),
				}))
			);
		} catch (err: any) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchMobileUsers();
	}, [tab]);

	const handleExport = () => {
		const users = data.map((user: User) => ({
			firstName: user.firstName,
			lastName: user.lastName,
			username: user.username,
			email: user.email,
			status: user.status,
			lastActive: user.updatedAt,
			signUp: user.createdAt,
		}));
		downloadCsv(users, "mobile-users");
	};

	return (
		<>
			<ControlBar>
				<h2>Mobile Users</h2>
				<RoundedButton onClick={handleExport}>Export</RoundedButton>
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

export default MobileUsersPage;
