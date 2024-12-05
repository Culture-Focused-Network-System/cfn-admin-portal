import { useNavigate } from "react-router-dom";
import ControlBar from "../../features/components/controlBar/ControlBar";
import { Container } from "../../features/styles/Container.styled";
import RoundedButton from "../../features/ui/roundedButton/RoundedButton";
import Tabs from "../../features/ui/tabs/Tabs";
import { useEffect, useState } from "react";
import { Community } from "../../features/types/Community.type";
import {
	MaterialReactTable,
	MRT_ColumnDef,
	useMaterialReactTable,
} from "material-react-table";
import CommunitiesApi from "../../features/api/Communities.api";
import { downloadCsv } from "../../features/utils/exportHelpers";
import { getFullName } from "../../features/utils/getFullName";
import { User } from "../../features/types/User.type";

const columns: MRT_ColumnDef<Community>[] = [
	{
		accessorKey: "nationality",
		header: "Nationality",
	},
	{
		accessorKey: "ethnicity",
		header: "Ethnicity",
	},
	{
		accessorKey: "topic",
		header: "Subject/Topic",
	},
	{
		accessorKey: "creator",
		header: "Creator",
		Cell: ({ cell }) => getFullName(cell.getValue<User>()),
	},
	{
		accessorKey: "language",
		header: "Language",
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
	},
	{
		accessorKey: "type",
		header: "Type",
	},
];

const CommunitiesPage = () => {
	const navigate = useNavigate();
	const [tab, setTab] = useState("Main Communities");
	const [data, setData] = useState<Community[]>([]);
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

	const fetchCommunities = async () => {
		let type = "";
		if (tab === "Main Communities") {
			type = "Main";
		} else if (tab === "Subcommunities") {
			type = "Sub";
		} else {
			type = "Needs Review";
		}

		try {
			const communities = await CommunitiesApi.getAll({ type });
			setData(communities);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchCommunities();
	}, [tab]);

	const handleExport = () => {
		const communities = data.map((comm) => ({
			nationality: comm.nationality,
			ethnicity: comm.ethnicity,
			topic: comm.topic,
			creator: getFullName(comm.creator as User),
			language: comm.language,
			type: comm.type,
			status: comm.status,
		}));
		downloadCsv(communities, "communities");
	};

	return (
		<>
			<ControlBar>
				<h2>Community Management</h2>
				<RoundedButton onClick={handleExport}>Export</RoundedButton>
			</ControlBar>
			<Container>
				<Tabs
					tabs={[
						"Main Communities",
						"Subcommunities",
						"Needs Review",
					]}
					activeTab={tab}
					onTabSelect={(value) => setTab(value)}
				/>
				<MaterialReactTable table={table} />
			</Container>
		</>
	);
};

export default CommunitiesPage;
