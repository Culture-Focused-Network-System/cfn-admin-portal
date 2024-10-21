import styled from "styled-components";

interface Props {
	$gap?: string;
}

export const StyledCard = styled.div<Props>`
	width: 100%;
	padding: 24px 16px;
	border-radius: 8px;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	display: flex;
	flex-direction: column;
	gap: ${({ $gap }) => ($gap ? $gap : "1rem")};
`;
