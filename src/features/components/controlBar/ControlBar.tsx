import { ReactNode } from "react";
import { StyledControlBar } from "./ControlBar.styled";

interface ControlBarProps {
	children: ReactNode;
}

const ControlBar = ({ children }: ControlBarProps) => {
	return <StyledControlBar>{children}</StyledControlBar>;
};

export default ControlBar;
