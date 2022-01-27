import react from "react";
import { useMediaQuery, useTheme } from "@mui/material";

type Devicetype = "mobile" | "tablet" | "desktop";

function useMobile(device: Devicetype = "mobile") {
  const getBreakPoint = () => {
    switch (device) {
      case "mobile":
        return theme.breakpoints.down("sm");
      case "tablet":
        return theme.breakpoints.between("sm", "md");
      default:
        return theme.breakpoints.up("md");
    }
  };
  const theme = useTheme();
  const matches = useMediaQuery(getBreakPoint());

  return matches;
}
export default useMobile;
