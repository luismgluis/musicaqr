import React, { useCallback, useEffect, useState } from "react";
import { styled, SwipeableDrawer } from "@mui/material";
import NavBarList from "./NavBarList";
import useMobile from "../../../hooks/useMobile";

const TAG = "NAVBAR DRAWER";

type NavBarDrawerProps = {
	open?: boolean;
	onClose?: () => void;
};
const NavBarDrawer: React.FC<NavBarDrawerProps> = ({ open, onClose }) => {
	const [visible, setVisible] = useState(true);
	const isMobile = useMobile();
	const isDesktop = useMobile("desktop");
	const isTablet = useMobile("tablet");

	const toggleDrawer = useCallback(
		(show: boolean) => {
			if (isDesktop) return;
			setVisible(show);
			if (onClose && !show) onClose();
		},
		[onClose, isDesktop]
	);

	useEffect(() => {
		if (isDesktop) {
			setVisible(true);
			return;
		}
		if (isTablet) setVisible(open || false);
		if (isMobile) setVisible(open || false);
	}, [isDesktop, isTablet, isMobile, open, setVisible]);

	console.log(TAG, "isMobile", isMobile, "isdesktop", isDesktop);
	const drawerWidth = "20%";
	return (
		<SwipeableDrawer
			anchor={isDesktop || isTablet ? "left" : "bottom"}
			variant={isDesktop ? "persistent" : "temporary"}
			sx={{
				width: isDesktop ? drawerWidth : undefined,

				flexShrink: 0,
				[`& .MuiDrawer-paper`]: {
					width: isDesktop ? drawerWidth : undefined,
					boxSizing: "border-box",
					bgcolor: (t) => t.palette.primary.dark,
				},
			}}
			open={visible}
			onClose={() => toggleDrawer(false)}
			onOpen={() => toggleDrawer(true)}
			swipeAreaWidth={20}
		>
			<NavBarList onSelect={() => toggleDrawer(false)} />
		</SwipeableDrawer>
	);
};
export default NavBarDrawer;
