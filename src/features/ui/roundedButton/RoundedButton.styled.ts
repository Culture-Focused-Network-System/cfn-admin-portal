import styled from "styled-components";

interface Props {
	$filled: boolean;
}

export const StyledRoundedButton = styled.button<Props>`
	display: flex;
	flex-direction: row;
	gap: 8px;
	justify-content: center;
	align-items: center;
	padding: 10px 24px;
	border-radius: 100px;
	background: ${({ theme, $filled }) =>
		$filled ? theme.colors.primary : "none"};
	border: 1px solid ${({ theme }) => theme.colors.primary};
	outline: none;
	cursor: pointer;
	font-size: 14px;
	font-weight: 500;
	line-height: 20px;
	color: ${({ theme, $filled }) =>
		$filled ? "white" : theme.colors.primary};
	transition: all 0.25s ease-in-out;

	&:hover {
		color: white;
		background: ${({ theme }) => theme.colors.primary};
	}
`;
