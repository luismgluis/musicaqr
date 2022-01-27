import "./NavBar.scss";
import React, { useMemo } from "react";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  IconButton,
  styled,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import useMobile from "../../../hooks/useMobile";
import { useHomeGoTo } from "../../../hooks/useHomeGoTo";
import CustomAvatar from "./CustomAvatar";
import { useCurrentBusiness } from "../../../hooks/currentBusiness";

const TAG = "NAV BAR";
type NavBarProps = {
  onOpenMenu?: () => void;
  menuOpened: boolean;
};

const MyThemeSpacingDiv = styled("div")(({ theme }) => ({
  minHeight: theme.mixins.toolbar.minHeight,
  marginBottom: "1rem",
}));

const NavBar: React.FC<NavBarProps> = ({ onOpenMenu, menuOpened }) => {
  console.log(TAG, "render");

  const isMobile = useMobile();
  const isDesktop = useMobile("desktop");
  const theme = useTheme();
  const cBusiness = useCurrentBusiness();

  const homeGoTo = useHomeGoTo();
  return (
    <React.Fragment>
      <Box
        sx={{
          flexGrow: 1,
          position: "fixed",
          width: "100%",
          bottom: 0,
          zIndex: 99,
        }}
      >
        {isMobile && (
          <BottomNavigation
            showLabels
            sx={{ bgcolor: theme.palette.primary.main }}
          >
            <BottomNavigationAction
              onClick={onOpenMenu}
              icon={<MenuIcon fontSize="large" />}
            />
            <Box
              justifyContent="center"
              alignItems="center"
              display="flex"
              width="100%"
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {homeGoTo.name}
                {!cBusiness.isEmpty ? ` - ${cBusiness.name}` : ""}
              </Typography>
            </Box>
            <BottomNavigationAction icon={<CustomAvatar />} />
          </BottomNavigation>
        )}
        {!isMobile && (
          <AppBar
            className="CustomAppBar"
            position="fixed"
            color="inherit"
            sx={{
              width: `calc(100% - ${menuOpened || isDesktop ? 20 : 0}%)`,
              minWidth: menuOpened || !isDesktop ? "200px" : undefined,
              bgcolor: theme.palette.primary.main,
            }}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, display: isDesktop ? "none" : undefined }}
                onClick={() => {
                  if (onOpenMenu) onOpenMenu();
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {homeGoTo.name}
                {!cBusiness.isEmpty ? ` - ${cBusiness.name}` : ""}
              </Typography>
              <CustomAvatar />
            </Toolbar>
          </AppBar>
        )}
      </Box>
      {!isMobile && <MyThemeSpacingDiv />}
    </React.Fragment>
  );
};
export default NavBar;
