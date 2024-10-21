import LayoutNav from "./LayoutNav";
import { StyledBody } from "./StyledLayout.styled";
import { Outlet } from "react-router-dom";

const LayoutBody = () => {
	return (
		<StyledBody>
			<LayoutNav />
			<main className="body-content">
				<Outlet />
			</main>
		</StyledBody>
	);
};

export default LayoutBody;
