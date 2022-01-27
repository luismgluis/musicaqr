import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";

function useBreackpoints(size: Breakpoint) {
  const theme = useTheme();
  const matchesUp = useMediaQuery(theme.breakpoints.up(size));
  const matchesDown = useMediaQuery(theme.breakpoints.down(size));
  console.log("matchesDown", matchesDown);
  console.log("matchesUp", matchesUp);
  return {
    down: matchesDown,
    up: matchesUp,
  };
}
export default useBreackpoints;
