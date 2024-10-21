import { ReactNode } from "react";
import { StyledCard } from "./Card.styled";

interface CardProps {
	children?: ReactNode;
	gap?: string;
}

const Card = ({ children, gap }: CardProps) => {
	return <StyledCard $gap={gap}>{children}</StyledCard>;
};

export default Card;
