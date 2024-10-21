import { useSelector } from "react-redux";
import { getAccessToken, getRole } from "../app/auth.slice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
	const role = useSelector(getRole);
	const accessToken = useSelector(getAccessToken);
	const location = useLocation();

	return (
		<>
			{role === "Admin" ? (
				<Outlet />
			) : accessToken ? (
				<Navigate
					to="/unauthorized"
					state={{ from: location }}
					replace
				/>
			) : (
				<Navigate to="/auth/login" state={{ from: location }} replace />
			)}
		</>
	);
};

export default RequireAuth;
