import { FormEvent, ReactNode } from "react";

interface FormProps {
	children: ReactNode;
	onSubmit: () => void;
}

const Form = ({ children, onSubmit }: FormProps) => {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit();
	};

	return <form onSubmit={handleSubmit}>{children}</form>;
};

export default Form;
