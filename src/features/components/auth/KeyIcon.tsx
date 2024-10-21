import { HiOutlineKey } from "react-icons/hi";

const KeyIcon = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				borderRadius: "100px",
				width: "56px",
				height: "56px",
				background: "#f8fafc",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					borderRadius: "100px",
					width: "40px",
					height: "40px",
					background: "#f1f5f9",
				}}
			>
				<HiOutlineKey
					style={{ width: "28px", height: "28px", color: "#2a468e" }}
				/>
			</div>
		</div>
	);
};

export default KeyIcon;
