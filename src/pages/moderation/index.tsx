import { Navigate, Route, Routes } from "react-router-dom";
import ModerationsPage from "./Moderations.page";
import ModerationPage from "./Moderation.page";

const ModerationRoot = () => {
	return (
		<Routes>
			<Route index element={<ModerationsPage />} />
			<Route path=":reportId" element={<ModerationPage />} />
			<Route path="*" element={<Navigate to="" />} />
		</Routes>
	);
};

export default ModerationRoot;
