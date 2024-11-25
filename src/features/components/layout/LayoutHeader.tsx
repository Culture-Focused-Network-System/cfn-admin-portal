import { Link } from "react-router-dom";
import { StyledHeader } from "./StyledLayout.styled";
import LayoutAvatar from "./LayoutAvatar";

const LayoutHeader = () => {
	return (
		<StyledHeader>
			<Link to="/">
				<h3>Cultiveo</h3>
			</Link>
			<LayoutAvatar />
		</StyledHeader>
	);
};

export default LayoutHeader;
