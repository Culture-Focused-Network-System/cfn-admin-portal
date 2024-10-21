import { Navigate, Route, Routes } from "react-router-dom";
import AdminUsersPage from "./AdminUsers.page";
import AddAdminUser from "./AddAdminUser.page";
import AdminUserPage from "./AdminUser.page";

const AdminUsersRoot = () => {
	return (
		<Routes>
			<Route index element={<AdminUsersPage />} />
			<Route path="add" element={<AddAdminUser />} />
			<Route path=":userId" element={<AdminUserPage />} />
			<Route path="*" element={<Navigate to="" />} />
		</Routes>
	);
};

export default AdminUsersRoot;
