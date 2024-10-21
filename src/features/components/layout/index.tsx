import LayoutBody from "./LayoutBody";
import LayoutHeader from "./LayoutHeader";
import { StyledLayout } from "./StyledLayout.styled";

const Layout = () => {
	return (
		<StyledLayout>
			<LayoutHeader />
			<LayoutBody />
		</StyledLayout>
	);
};

export default Layout;
