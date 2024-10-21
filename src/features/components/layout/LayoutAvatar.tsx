import { useRef, useState } from "react";
import { LayoutDropdown, StyledAvatar } from "./StyledLayout.styled";
import useOutsideClick from "../../hooks/useOutsideClick";
import useLogout from "../../auth/useLogout";
import { useNavigate } from "react-router-dom";

const LayoutAvatar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const logout = useLogout();
	const navigate = useNavigate();

	const toggleOpen = () => setIsOpen(!isOpen);

	useOutsideClick(ref, () => setIsOpen(false));

	const handleClick = async () => {
		setIsOpen(false);
		try {
			await logout();
		} catch (err: any) {
			console.log(err);
		} finally {
			navigate("/auth/login");
		}
	};

	return (
		<div ref={ref}>
			<StyledAvatar onClick={toggleOpen}>A</StyledAvatar>
			{isOpen && (
				<LayoutDropdown>
					<p onClick={handleClick}>Sign Out</p>
				</LayoutDropdown>
			)}
		</div>
	);
};

export default LayoutAvatar;
