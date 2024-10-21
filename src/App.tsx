import { Navigate, Route, Routes } from "react-router-dom";
import AuthRoot from "./pages/auth";
import Layout from "./features/components/layout";
import MobileUsersRoot from "./pages/mobileUsers";
import CommunitiesRoot from "./pages/communities";
import AdminUsersRoot from "./pages/adminUsers";
import ModerationRoot from "./pages/moderation";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import UnauthorizedRoot from "./pages/unauthorized";

const App = () => {
	return (
		<Routes>
			{/* public */}
			<Route path="auth/*" element={<AuthRoot />} />
			<Route path="unauthorized" element={<UnauthorizedRoot />} />

			{/* private */}
			<Route element={<Layout />}>
				<Route element={<PersistLogin />}>
					<Route element={<RequireAuth />}>
						<Route
							path="mobile-users/*"
							element={<MobileUsersRoot />}
						/>
						<Route
							path="communities/*"
							element={<CommunitiesRoot />}
						/>
						<Route
							path="moderation/*"
							element={<ModerationRoot />}
						/>
						<Route
							path="admin-users/*"
							element={<AdminUsersRoot />}
						/>
						<Route path="settings" />
					</Route>
				</Route>
			</Route>

			{/* catch-all */}
			<Route path="*" element={<Navigate to="/mobile-users" />} />
		</Routes>
	);
};

export default App;
