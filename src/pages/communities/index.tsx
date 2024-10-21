import { Navigate, Route, Routes } from "react-router-dom";
import CommunitiesPage from "./Communities.page";
import CommunityPage from "./Community.page";

const CommunitiesRoot = () => {
	return (
		<Routes>
			<Route index element={<CommunitiesPage />} />
			<Route path=":communityId" element={<CommunityPage />} />
			<Route path="*" element={<Navigate to="" />} />
		</Routes>
	);
};

export default CommunitiesRoot;
