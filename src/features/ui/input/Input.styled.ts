import styled from "styled-components";

export const StyledInput = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;

	label {
		font-weight: 500;
		font-size: 14px;
		line-height: 20px;
		color: ${({ theme }) => theme.colors.textGray};
	}

	input {
		width: 100%;
		border-radius: 8px;
		border: 1px solid #d0d5dd;
		padding: 10px 14px;
		font-weight: 400px;
		font-size: 16px;
		line-height: 24px;
		color: ${({ theme }) => theme.colors.textGray};

		&:active,
		&:focus {
			outline: none;
			border-color: ${({ theme }) => theme.colors.primary};
		}
	}
`;
