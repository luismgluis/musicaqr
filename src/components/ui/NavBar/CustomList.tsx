import React, { useCallback } from "react";
import {
  Divider,
  Menu,
  MenuItem,
  styled,
  Typography,
  useTheme,
} from "@mui/material";

import { Box } from "@mui/system";
import { useCurrentUser } from "../../../hooks/currentUser";
import useMobile from "../../../hooks/useMobile";

import { useGoto } from "../../../hooks/useGoTo";
import { useSetHomeGoTo } from "../../../hooks/useHomeGoTo";
import { useAlert } from "../Alert/useAlert";
import Api from "../../../api/Api";

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  ":hover": {
    background: theme.palette.secondary.main,
  },
}));

type CustomListProps = {
  isVisible: boolean;
  onClose: () => void;
  element: HTMLElement | null;
};
const CustomList: React.FC<CustomListProps> = ({
  isVisible = false,
  onClose,
  element,
}) => {
  const me = useCurrentUser();

  const isMobile = useMobile();
  const theme = useTheme();
  const alert = useAlert();
  const goTo = useGoto();
  const homeGoTo = useSetHomeGoTo();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const logOut = useCallback(() => {
    alert.info({
      title: "Cerrar Sesión",
      body: "Seguro quieres cerrar la sesión actual?",
      enabled: true,
      okButton: "Si",
      noButton: "Cancelar",
      onClose: (res) => {
        if (res) {
          Api.app
            .logOut()
            .then(() => {
              goTo.login();
            })
            .catch((err) => alert);
        }
      },
    });
    onClose();
  }, [onClose, alert, goTo]);
  return (
    <Menu
      id="menu-appbarr"
      anchorEl={element}
      keepMounted={false}
      anchorPosition={{ left: 1, top: 30 }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      anchorReference="anchorEl"
      transformOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={isVisible}
      onClose={() => handleClose()}
    >
      <Box marginX={3} py={2}>
        Hola, {me.name}
      </Box>
      <Divider />
      <MenuItem onClick={handleClose}>Editar perfil</MenuItem>
      <CustomMenuItem
        sx={{ bgcolor: theme.palette.secondary.main }}
        onClick={logOut}
      >
        <Typography
          color={theme.palette.getContrastText(theme.palette.secondary.main)}
        >
          Cerrar sesión
        </Typography>
      </CustomMenuItem>
    </Menu>
  );
};

export default CustomList;
