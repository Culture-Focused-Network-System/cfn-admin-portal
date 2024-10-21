import styled from "styled-components";

export const StyledStatsTable = styled.div`
	width: 500px;
`;

export const StatsTableRow = styled.div`
	border-bottom: 1px solid black;
	display: flex;
	padding: 4px 8px;

	p {
		width: 250px;

		&.title {
			font-weight: 600;
		}
	}
`;
