import { useDispatch } from "react-redux";
import AuthApi from "../api/Auth.api";
import { setAccessToken, setRole } from "../app/auth.slice";

const useRefreshToken = () => {
	const dispatch = useDispatch();

	const refresh = async () => {
		const { accessToken, role } = await AuthApi.refresh();

		dispatch(setAccessToken(accessToken));
		dispatch(setRole(role));

		return accessToken;
	};

	return refresh;
};

export default useRefreshToken;
