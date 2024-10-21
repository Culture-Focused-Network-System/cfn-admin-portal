import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Report } from "../../features/types/Report.type";
import {
	MaterialReactTable,
	MRT_ColumnDef,
	useMaterialReactTable,
} from "material-react-table";
import ControlBar from "../../features/components/controlBar/ControlBar";
import RoundedButton from "../../features/ui/roundedButton/RoundedButton";
import { Container } from "../../features/styles/Container.styled";
import Tabs from "../../features/ui/tabs/Tabs";
import ReportsApi from "../../features/api/Reports.api";
import { downloadCsv } from "../../features/utils/exportHelpers";
import { getFullName } from "../../features/utils/getFullName";
import { User } from "../../features/types/User.type";

const columns: MRT_ColumnDef<Report>[] = [
	{
		accessorKey: "issue",
		header: "Issue",
	},
	{
		accessorKey: "reportedBy",
		header: "Reported By",
		Cell: ({ cell }) => getFullName(cell.getValue<User>()),
	},
	{
		accessorKey: "reportedUser",
		header: "User Reported",
		Cell: ({ cell }) => getFullName(cell.getValue<User>()),
	},
	{
		accessorKey: "reportedItem",
		header: "Reported Item",
	},
	{
		accessorKey: "createdAt",
		header: "Date Reported",
	},
];

const ModerationsPage = () => {
	const navigate = useNavigate();
	const [tab, setTab] = useState("Not Viewed");
	const [data, setData] = useState<Report[]>([]);
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

	const fetchReports = async () => {
		try {
			const reports = await ReportsApi.getAll({ status: tab });
			setData(reports);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchReports();
	}, [tab]);

	const handleExport = () => {
		const reports = data.map((report) => ({
			_id: report._id,
			reportedBy: report.reportedBy,
			userReported: report.reportedUser,
			reportedItem: report.reportedItem,
			dateReported: report.createdAt,
		}));
		downloadCsv(reports, "moderation-reports");
	};

	return (
		<>
			<ControlBar>
				<h2>Moderation</h2>
				<RoundedButton onClick={handleExport}>Export</RoundedButton>
			</ControlBar>
			<Container>
				<Tabs
					tabs={["Not Viewed", "Resolved", "Unresolved"]}
					activeTab={tab}
					onTabSelect={(value) => setTab(value)}
				/>
				<MaterialReactTable table={table} />
			</Container>
		</>
	);
};

export default ModerationsPage;
