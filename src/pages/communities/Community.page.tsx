import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ControlBar from "../../features/components/controlBar/ControlBar";
import { Row } from "../../features/styles/Row.styled";
import { MdArrowBack } from "react-icons/md";
import { Community } from "../../features/types/Community.type";
import { Container } from "../../features/styles/Container.styled";
import Card from "../../features/ui/card/Card";
import RoundedButton from "../../features/ui/roundedButton/RoundedButton";
import { Column } from "../../features/styles/Column.styled";
import { MenuItem, TextField } from "@mui/material";
import StatsTable from "../../features/ui/statsTable/StatsTable";
import Form from "../../features/ui/form/Form";
import CommunitiesApi from "../../features/api/Communities.api";
import { Post } from "../../features/types/Post.type";
import PostsApi from "../../features/api/Posts.api";
import { formatDateTime } from "../../features/utils/formatDateTime";
import { getFullName } from "../../features/utils/getFullName";
import { User } from "../../features/types/User.type";

const CommunityPage = () => {
	const { communityId } = useParams();
	const navigate = useNavigate();
	const [community, setCommunity] = useState<Community | null>(null);
	const [posts, setPosts] = useState<Post[] | null>(null);
	const [canEdit, setCanEdit] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const fetchCommunity = async () => {
		try {
			if (!communityId) return;
			const data = await CommunitiesApi.getById(communityId);
			setCommunity(data);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchPosts = async () => {
		try {
			const data = await PostsApi.getAll({ community: communityId });
			setPosts(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (!communityId) {
			navigate("/communities");
		}
		fetchCommunity();
		fetchPosts();
	}, []);

	const handleEditClick = async () => {
		try {
			if (canEdit) {
				setCanEdit(false);
				await fetchCommunity();
			} else {
				setCanEdit(true);
			}
		} catch (err: any) {
			console.log(err.message);
		}
	};

	const handleSaveClick = async () => {
		if (isLoading || !communityId || !community) return;
		try {
			setIsLoading(true);
			await CommunitiesApi.update(communityId, community);
			await handleEditClick();
			alert("Community has been saved.");
		} catch (err: any) {
			console.log(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	if (!community) {
		return <h2>Loading...</h2>;
	}

	return (
		<Form onSubmit={handleSaveClick}>
			<ControlBar>
				<Row $gap="0.5rem">
					<MdArrowBack
						className="clickable"
						onClick={() => navigate(-1)}
					/>
					<h2>Community Management</h2>
				</Row>
			</ControlBar>
			<Container>
				<Card gap="2rem">
					<Row $justifyContent="space-between">
						<h2>About</h2>
						<Row $gap="0.5rem">
							{canEdit && (
								<RoundedButton filled>
									{isLoading ? "Saving..." : "Save"}
								</RoundedButton>
							)}
							<RoundedButton
								type="button"
								onClick={handleEditClick}
							>
								{canEdit ? "Cancel" : "Edit"}
							</RoundedButton>
						</Row>
					</Row>
					<div style={{ width: "400px" }}>
						{canEdit ? (
							<Column $gap="1.5rem">
								<TextField
									variant="outlined"
									id="nationality"
									label="Nationality"
									value={community.nationality || ""}
									onChange={(e) =>
										setCommunity({
											...community,
											nationality: e.target.value,
										})
									}
									required
								/>
								<TextField
									variant="outlined"
									id="ethnicity"
									label="Ethnicity"
									value={community.ethnicity || ""}
									onChange={(e) =>
										setCommunity({
											...community,
											ethnicity: e.target.value,
										})
									}
									required
								/>
								<TextField
									variant="outlined"
									id="subject"
									label="Subject/Topic"
									value={community.topic || ""}
									onChange={(e) =>
										setCommunity({
											...community,
											topic: e.target.value,
										})
									}
									required
								/>
								<TextField
									variant="outlined"
									id="creator"
									label="Creator"
									value={
										getFullName(
											community.creator as User
										) || ""
									}
									onChange={(e) =>
										setCommunity({
											...community,
											creator: e.target.value,
										})
									}
									required
									disabled
								/>
								<TextField
									variant="outlined"
									id="language"
									label="Language"
									value={community.language || ""}
									onChange={(e) =>
										setCommunity({
											...community,
											language: e.target.value,
										})
									}
									required
								/>
								<TextField
									variant="outlined"
									id="createdAt"
									label="Created At"
									value={community.createdAt || ""}
									onChange={(e) =>
										setCommunity({
											...community,
											createdAt: e.target.value,
										})
									}
									required
									disabled
								/>
								<TextField
									variant="outlined"
									id="type"
									select
									label="Type"
									value={community.type || ""}
									onChange={(e) =>
										setCommunity({
											...community,
											type: e.target.value as
												| "Main"
												| "Sub"
												| "Needs Review",
										})
									}
									required
								>
									<MenuItem key="Main" value="Main">
										Main Community
									</MenuItem>
									<MenuItem key="Sub" value="Sub">
										Subcommunity
									</MenuItem>
									<MenuItem
										key="Needs Review"
										value="Needs Review"
									>
										Needs Review
									</MenuItem>
								</TextField>
								<TextField
									variant="outlined"
									id="status"
									select
									label="Status"
									value={community.status || ""}
									onChange={(e) =>
										setCommunity({
											...community,
											status:
												e.target.value === "Enabled"
													? "Enabled"
													: "Disabled",
										})
									}
									required
								>
									<MenuItem key="enabled" value="Enabled">
										Enabled
									</MenuItem>
									<MenuItem key="disabled" value="Disabled">
										Disabled
									</MenuItem>
								</TextField>
							</Column>
						) : (
							<Column $gap="1.5rem">
								<Column $gap="0.25rem">
									<p className="text-xs">Nationality</p>
									<p>{community.nationality}</p>
								</Column>
								<Column $gap="0.25rem">
									<p className="text-xs">Ethnicity</p>
									<p>{community.ethnicity}</p>
								</Column>
								<Column $gap="0.25rem">
									<p className="text-xs">Subject/Topic</p>
									<p>{community.topic}</p>
								</Column>
								<Column $gap="0.25rem">
									<p className="text-xs">Creator</p>
									<p>
										{getFullName(community.creator as User)}
									</p>
								</Column>
								<Column $gap="0.25rem">
									<p className="text-xs">Language</p>
									<p>{community.language}</p>
								</Column>
								<Column $gap="0.25rem">
									<p className="text-xs">Created At</p>
									<p>{community.createdAt}</p>
								</Column>
								<Column $gap="0.25rem">
									<p className="text-xs">Type</p>
									<p>{community.type}</p>
								</Column>
								<Column $gap="0.25rem">
									<p className="text-xs">Status</p>
									<p>{community.status}</p>
								</Column>
							</Column>
						)}
					</div>
				</Card>
			</Container>
			<Container>
				<Card gap="2rem">
					<h2>Stats</h2>
					<StatsTable
						data={[
							{
								title: "Member Count",
								value: `${community.members.length}/30`,
							},
							{
								title: "Number of Posts",
								value: posts?.length || "N/A",
							},
							{
								title: "Last Active",
								value: formatDateTime(community.updatedAt),
							},
						]}
					/>
				</Card>
			</Container>
		</Form>
	);
};

export default CommunityPage;
