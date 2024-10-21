import { StatsTableRow, StyledStatsTable } from "./StatsTable.styled";

type StatsData = {
	title: string;
	value: string | number;
};

interface StatsTableProps {
	data: StatsData[];
}

const StatsTable = ({ data }: StatsTableProps) => {
	return (
		<StyledStatsTable>
			{data.map((row, index) => (
				<StatsTableRow key={index}>
					<p className="title">{row.title}</p>
					<p>{row.value}</p>
				</StatsTableRow>
			))}
		</StyledStatsTable>
	);
};

export default StatsTable;
