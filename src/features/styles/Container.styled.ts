import styled from "styled-components";

interface ContainerProps {
	$gap?: string;
}

export const Container = styled.section<ContainerProps>`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: ${({ $gap }) => ($gap ? $gap : "1rem")};
`;
