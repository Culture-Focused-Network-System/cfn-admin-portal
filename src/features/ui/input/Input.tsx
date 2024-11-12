import { InputHTMLAttributes } from "react";
import { StyledInput } from "./Input.styled";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
	error?: string;
}

const Input = ({ id, label, required, error = "", ...rest }: InputProps) => {
	return (
		<StyledInput>
			<label htmlFor={id}>
				{label}
				{required && "*"}
			</label>
			<input id={id} {...rest} required={required} />
			{error && <p className="error">{error}</p>}
		</StyledInput>
	);
};

export default Input;
