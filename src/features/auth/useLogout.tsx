import { useDispatch } from "react-redux";
import { reset } from "../app/auth.slice";
import AuthApi from "../api/Auth.api";

const useLogout = () => {
	const dispatch = useDispatch();

	const logout = async () => {
		dispatch(reset());

		try {
			await AuthApi.logout();
		} catch (err: any) {
			return err;
		}
	};

	return logout;
};

export default useLogout;
