import styled from "styled-components";

export const StyledButton = styled.button`
	border-radius: 8px;
	outline: none;
	border: none;
	color: white;
	background: ${({ theme }) => theme.colors.primary};
	padding: 10px 18px;
	font-size: 16px;
	font-weight: 600;
	line-height: 24px;
	cursor: pointer;

	&:disabled {
		cursor: not-allowed;
	}

	&:hover,
	&:focus {
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
`;
