import React, { useCallback, useMemo } from "react";
import {
	List,
	ListSubheader,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	styled,
	Divider,
	Box,
	Typography,
} from "@mui/material";
//import SendIcon from "@mui/icons-material/Send";

//import DraftsIcon from "@mui/icons-material/Drafts";
import useMobile from "../../../hooks/useMobile";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PanoramaHorizontalIcon from "@mui/icons-material/PanoramaHorizontal";
import { useHomeGoTo, useSetHomeGoTo } from "../../../hooks/useHomeGoTo";
import { HomeGotoType } from "../../HomeCurrentScreen";
import AppIcon from "../../icons/AppIcon";
import { AccountBalance, Router } from "@mui/icons-material";

const TAG = "NAVBAR LIST";

type NavBarListProps = {
	onSelect?: () => void;
	onlyList?: boolean;
};

const NavBarList: React.FC<NavBarListProps> = ({ onSelect, onlyList }) => {
	console.log(TAG, "render");

	const isMobile = useMobile();
	const setHomeGoTo = useSetHomeGoTo();
	const homeGoto = useHomeGoTo();
	const customGoto = useCallback(
		(screen: any, name: string) => {
			setHomeGoTo(screen, name);
			if (onSelect) onSelect();
		},
		[setHomeGoTo, onSelect]
	);

	const OptionsList = useMemo(() => {
		type nHomeType = {
			icon: JSX.Element;
			data: HomeGotoType;
		};
		const arr: nHomeType[] = [
			{
				icon: <AccountBalance />,
				data: {
					screen: "BusinessScreen",
					name: "Empresas",
				},
			},
			{
				icon: <PersonSearchIcon />,
				data: {
					screen: "UsersScreen",
					name: "Clientes",
				},
			},
			{
				icon: <Router />,
				data: {
					screen: "RoutersScreen",
					name: "Routers",
				},
			},
		];
		return arr;
	}, []);

	return (
		<List
			sx={{
				width: "100%",
				// maxWidth: isMobile ? undefined : 360,
				minWidth: isMobile ? undefined : 200,
				// bgcolor: onlyList ? undefined : "background.paper",
			}}
			component="nav"
			aria-labelledby="nested-list-subheader"
			subheader={
				onlyList ? undefined : (
					<Box bgcolor="primary.darkPlus" pt={3} px={2}>
						<Box
							sx={{
								alignContent: "center",
								justifyContent: "center",
								display: "flex",
								// margin: "10px 0px 0px 10px",
							}}
						>
							<AppIcon width={80} />
						</Box>
						<Typography
							color="white"
							fontWeight="700"
							width="100%"
							textAlign="center"
						>
							Cambiar Mi Wifi
						</Typography>

						<Divider />
					</Box>
				)
			}
		>
			<Divider />
			{OptionsList.map((option, index) => (
				<ListItemButton
					key={`ListNavBarItem${index}`}
					sx={{ bgcolor: "primary.darkPlus", my: 1 }}
					onClick={() =>
						customGoto(option.data.screen, option.data.name)
					}
				>
					<ListItemIcon sx={{ color: "primary.light" }}>
						{option.icon}
					</ListItemIcon>
					<ListItemText
						sx={{ color: "white" }}
						primary={option.data.name}
					/>
					<Box
						sx={{
							direction: "rtl",
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						{homeGoto.name === option.data.name && (
							<ListItemIcon sx={{ color: "primary.light" }}>
								<PanoramaHorizontalIcon />
							</ListItemIcon>
						)}
					</Box>
				</ListItemButton>
			))}
		</List>
	);
};
export default NavBarList;
