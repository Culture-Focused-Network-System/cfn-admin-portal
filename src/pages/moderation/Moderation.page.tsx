import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Report } from "../../features/types/Report.type";
import ControlBar from "../../features/components/controlBar/ControlBar";
import { Row } from "../../features/styles/Row.styled";
import { MdArrowBack } from "react-icons/md";
import { Container } from "../../features/styles/Container.styled";
import Card from "../../features/ui/card/Card";
import { Column } from "../../features/styles/Column.styled";
import ReportsApi from "../../features/api/Reports.api";
import RoundedButton from "../../features/ui/roundedButton/RoundedButton";
import UsersApi from "../../features/api/Users.api";
import { getFullName } from "../../features/utils/getFullName";
import { User } from "../../features/types/User.type";

const ModerationPage = () => {
	const { reportId } = useParams();
	const navigate = useNavigate();
	const [report, setReport] = useState<Report | null>(null);
	const [canEdit, setCanEdit] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const fetchReport = async () => {
		if (!reportId) return;
		try {
			const data = await ReportsApi.getById(reportId);
			setReport(data);
		} catch (err: any) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		if (!reportId) {
			navigate("/moderation");
		}
		fetchReport();
	}, []);

	const markViewed = async () => {
		if (!reportId) return;
		try {
			setIsLoading(true);
			await ReportsApi.update(reportId, { status: "Unresolved" });
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (report && report?.status === "Not Viewed") {
			markViewed();
		}
	}, [report]);

	const handleDeactivateUser = async () => {
		try {
			setIsLoading(true);
			if (!confirm("Are you sure you want to deactivate this user?")) {
				return;
			}
			if (!report?.reportedUser) {
				return alert("Unable to deactivate user: user not found.");
			}

			await UsersApi.update(report.reportedUser as string, {
				status: "Disabled",
			});
			alert("User has been deactivated.");

			navigate("/moderation");
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRemoveUser = async () => {
		try {
			setIsLoading(true);
			if (
				!confirm(
					"Are you sure you want to delete this user? This action cannot be undone."
				)
			) {
				return;
			}
			if (!report?.reportedUser) {
				return alert("Unable to remove user: user not found.");
			}

			await UsersApi.delete(report.reportedUser as string);
			alert("User has been deleted");

			navigate("/moderation");
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	if (!report) return <h2>Loading...</h2>;

	return (
		<>
			<ControlBar>
				<Row $gap="0.5rem">
					<MdArrowBack
						className="clickable"
						onClick={() => navigate(-1)}
					/>
					<h2>Moderation Report</h2>
				</Row>
			</ControlBar>
			<Container>
				<Card gap="2rem">
					<Row $justifyContent="space-between">
						<h2>About</h2>
						<Row $gap="0.5rem">
							<RoundedButton
								type="button"
								onClick={() => setCanEdit(!canEdit)}
							>
								{canEdit ? "Cancel" : "Edit"}
							</RoundedButton>
						</Row>
					</Row>
					<div style={{ width: "400px" }}>
						<Column $gap="1.5rem">
							{canEdit && (
								<Row>
									<button
										onClick={handleDeactivateUser}
										className="button"
									>
										{isLoading
											? "Saving..."
											: "Deactivate User"}
									</button>
									<button
										onClick={handleRemoveUser}
										className="button"
									>
										{isLoading
											? "Saving..."
											: "Remove User"}
									</button>
								</Row>
							)}
							<Column $gap="0.25rem">
								<p className="text-xs">Status</p>
								<p>{report.status}</p>
							</Column>
							<Column $gap="0.25rem">
								<p className="text-xs">Issue</p>
								<p>{report.issue}</p>
							</Column>
							<Column $gap="0.25rem">
								<p className="text-xs">Reported By</p>
								<p>{getFullName(report.reportedBy as User)}</p>
							</Column>
							<Column $gap="0.25rem">
								<p className="text-xs">User Reported</p>
								<p>
									{getFullName(report.reportedUser as User)}
								</p>
							</Column>
							<Column $gap="0.25rem">
								<p className="text-xs">Reported Item</p>
								<p>{report.reportedItem}</p>
							</Column>
							<Column $gap="0.25rem">
								<p className="text-xs">Date Reported</p>
								<p>{report.createdAt}</p>
							</Column>
						</Column>
					</div>
				</Card>
			</Container>
		</>
	);
};

export default ModerationPage;
