import styled from "styled-components";

export const StyledLayout = styled.section`
	display: flex;
	flex-direction: column;
	height: 100vh;

	& > * {
		flex-shrink: 0;
	}
`;

export const StyledHeader = styled.header`
	background: ${({ theme }) => theme.colors.primary};
	padding: 24px 32px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	h3 {
		color: white;
	}
`;

export const StyledBody = styled.section`
	display: flex;
	flex-direction: row;
	width: 100%;
	flex-grow: 1;
	overflow-x: auto;

	& > * {
		flex-shrink: 0;
	}

	.body-content {
		flex-grow: 1;
		height: 100%;
		overflow-y: scroll;
	}
`;

export const StyledNav = styled.nav`
	height: 100%;
	background: #e0e7e9;
	width: 260px;
	padding: 2rem 1rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	a {
		padding: 16px 24px;
		border-radius: 100px;
		display: flex;
		gap: 12px;
		color: black;
		font-weight: 400;
		transition: all 0.25s ease-in-out;

		&:hover {
			background: #2a468e80;
		}

		&.active {
			font-weight: 500;
			background: #2a468e80;
		}
	}
`;

export const StyledAvatar = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 100px;
	background: white;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 16px;
	font-weight: 500;
	line-height: 24px;
	letter-spacing: 0.1px;
	text-align: center;
	cursor: pointer;
`;

export const LayoutDropdown = styled.nav`
	position: absolute;
	right: 0;
	top: 3rem;
	background: white;
	z-index: 1000;
	border: 1px solid ${({ theme }) => theme.colors.primary};
	border-radius: 8px;

	p {
		white-space: nowrap;
		padding: 8px 24px;
		cursor: pointer;
	}
`;
