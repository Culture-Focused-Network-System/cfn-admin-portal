import { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./Button.styled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, disabled, ...rest }: ButtonProps) => {
	return (
		<StyledButton disabled={disabled} {...rest}>
			{disabled ? "Loading..." : children}
		</StyledButton>
	);
};

export default Button;
