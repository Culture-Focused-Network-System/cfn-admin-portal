import styled from "styled-components";

interface ColumnProps {
	$gap?: string;
}

export const Column = styled.div<ColumnProps>`
	display: flex;
	flex-direction: column;
	gap: ${(props) => props?.$gap || "1rem"};
`;
