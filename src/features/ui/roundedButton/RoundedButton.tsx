import { ButtonHTMLAttributes, ReactNode } from "react";
import { StyledRoundedButton } from "./RoundedButton.styled";

interface RoundedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	onClick?: () => void;
	filled?: boolean;
}

const RoundedButton = ({
	children,
	filled = false,
	onClick,
	...rest
}: RoundedButtonProps) => {
	const handleClick = () => {
		onClick && onClick();
	};

	return (
		<StyledRoundedButton onClick={handleClick} $filled={filled} {...rest}>
			{children}
		</StyledRoundedButton>
	);
};

export default RoundedButton;
