import {
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Typography,
	Divider,
} from "@mui/material";
import React from "react";

import utils from "../../../libs/utils/utils";

type ListItemUserProps = {
	title: string;
	avatarUri: string;
	subTitle: string;
	description: string;
};
const ListItemUser: React.FC<ListItemUserProps> = ({
	title,
	avatarUri,
	subTitle,
	description,
}) => {
	return (
		<>
			<ListItem alignItems="flex-start">
				<ListItemAvatar>
					<Avatar
						alt="Remy Sharp"
						src={
							utils.includes(avatarUri, "http")
								? avatarUri
								: undefined
						}
					>
						{avatarUri}
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={title}
					secondary={
						<React.Fragment>
							<Typography
								sx={{ display: "inline" }}
								component="span"
								variant="body2"
								color="text.primary"
							>
								{subTitle}
							</Typography>
							<br />
							<Typography
								sx={{ display: "inline" }}
								component="span"
								variant="body2"
								color="textSecondary"
							>
								{description}
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItem>
			<Divider variant="inset" />
		</>
	);
};
export default ListItemUser;
