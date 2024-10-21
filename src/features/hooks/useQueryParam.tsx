import { useLocation } from "react-router-dom";

const useQueryParam = (key: string) => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);

	return queryParams.get(key);
};

export default useQueryParam;
