import styled from "styled-components";

interface Row {
	$gap?: string;
	$justifyContent?: string;
	$alignItems?: string;
}

export const Row = styled.div<Row>`
	display: flex;
	flex-direction: row;
	gap: ${(props) => props?.$gap || "1rem"};
	justify-content: ${(props) => props?.$justifyContent || "flex-start"};
	align-items: ${(props) => props?.$alignItems || "center"};
	flex-shrink: 0;
`;
