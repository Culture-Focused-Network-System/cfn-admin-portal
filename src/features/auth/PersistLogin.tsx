import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAccessToken } from "../app/auth.slice";
import useRefreshToken from "./useRefreshToken";
import { Container } from "../styles/Container.styled";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const accessToken = useSelector(getAccessToken);
	const refresh = useRefreshToken();

	useEffect(() => {
		let isMounted = true;

		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (err: any) {
				console.log(err);
			} finally {
				isMounted && setIsLoading(false);
			}
		};

		accessToken ? setIsLoading(false) : verifyRefreshToken();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<>
			{isLoading ? (
				<Container>
					<h5>Authorizing....</h5>
				</Container>
			) : (
				<Outlet />
			)}
		</>
	);
};

export default PersistLogin;
