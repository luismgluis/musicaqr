import "./Home.scss";
import React, { useState } from "react";
import NavBar from "../../ui/NavBar/NavBar";
import NavBarDrawer from "../../ui/NavBar/NavBarDrawer";
import { useHomeGoTo } from "../../../hooks/useHomeGoTo";
import useMobile from "../../../hooks/useMobile";

import { Box } from "@mui/material";
const TAG = "HOME";
type HomeProps = {
	prop1?: any;
};
const Home: React.FC<HomeProps> = ({ prop1 }) => {
	console.log(TAG, "render");
	const homeGoTo = useHomeGoTo();
	const [visibleDrawer, setVisibleDrawer] = useState(false);
	const isDesktop = useMobile("desktop");
	const isMobile = useMobile("mobile");
	return (
		<div className="Home">
			<div className="HomeLeft">
				<NavBarDrawer
					open={visibleDrawer}
					onClose={() => setVisibleDrawer(false)}
				/>
			</div>
			<div className="HomeRight">
				<Box
					sx={{
						width: isDesktop ? "80%" : undefined,
						marginLeft: isDesktop ? "20%" : undefined,
						paddingBottom: isMobile ? "50px" : undefined,
					}}
				>
					<NavBar
						onOpenMenu={() => setVisibleDrawer(!visibleDrawer)}
						menuOpened={visibleDrawer}
					/>
					{/* {homeGoTo.screen === "UsersScreen" && <CustomersScreen />}
          {homeGoTo.screen === "BusinessScreen" && <BusinessScreen />}
          {homeGoTo.screen === "RoutersScreen" && <RoutersScreen />} */}
				</Box>
			</div>
		</div>
	);
};
export default Home;
