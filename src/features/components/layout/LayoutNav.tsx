import { NavLink } from "react-router-dom";
import { StyledNav } from "./StyledLayout.styled";
import {
	MdGroups,
	MdOutlinePersonOutline,
	MdOutlineWarning,
	MdSettings,
	MdSupervisedUserCircle,
} from "react-icons/md";

const LayoutNav = () => {
	return (
		<StyledNav>
			<NavLink to="/mobile-users">
				<MdOutlinePersonOutline />
				Mobile Users
			</NavLink>
			<NavLink to="/communities">
				<MdGroups />
				Communities
			</NavLink>
			<NavLink to="/moderation">
				<MdOutlineWarning />
				Moderation
			</NavLink>
			<NavLink to="/admin-users">
				<MdSupervisedUserCircle />
				Admin Users
			</NavLink>
			<NavLink to="/settings">
				<MdSettings />
				Settings
			</NavLink>
		</StyledNav>
	);
};

export default LayoutNav;
