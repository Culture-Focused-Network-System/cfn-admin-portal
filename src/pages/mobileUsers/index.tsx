import { Navigate, Route, Routes } from "react-router-dom";
import MobileUsersPage from "./MobileUsers.page";
import MobileUserPage from "./MobileUser.page";

const MobileUsersRoot = () => {
	return (
		<Routes>
			<Route index element={<MobileUsersPage />} />
			<Route path=":userId" element={<MobileUserPage />} />
			<Route path="*" element={<Navigate to="" />} />
		</Routes>
	);
};

export default MobileUsersRoot;
