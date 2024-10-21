import styled from "styled-components";

export const StyledTabs = styled.div`
	display: flex;
	flex-direction: row;
`;

export const StyledTab = styled.p<{ $active: boolean }>`
	min-width: 150px;
	padding: 0.5rem 1rem;
	white-space: nowrap;
	font-size: 16px;
	font-weight: 400;
	line-height: 24px;
	letter-spacing: 0.5px;
	text-align: center;
	cursor: pointer;
	color: ${({ $active }) => ($active ? "#1F1F1F" : "#CBCBCD")};
	border-bottom: 1px solid
		${({ $active }) => ($active ? "#1F1F1F" : "#CBCBCD")};
`;
