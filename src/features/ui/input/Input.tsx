import { InputHTMLAttributes } from "react";
import { StyledInput } from "./Input.styled";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
}

const Input = ({ id, label, required, ...rest }: InputProps) => {
	return (
		<StyledInput>
			<label htmlFor={id}>
				{label}
				{required && "*"}
			</label>
			<input id={id} {...rest} required={required} />
		</StyledInput>
	);
};

export default Input;
