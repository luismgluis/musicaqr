import { createTheme } from "@mui/material";

const tp: any = {
  typography: {
    fontFamily: "Noto Sans, Raleway, Arial",
    button: {
      fontFamily: "Raleway, Arial",
    },
  },
};
const ThemeConfig = createTheme({
  ...tp,
  palette: {
    primary: {
      main: "#00bbd3", //purple[500],
      light: "#62eeff",
      dark: "#008ba2",
      darkPlus: "#006070",
      contrastText: "#02424c",
    },
    secondary: {
      main: "#ed407a",
      light: "#ff77a9",
      dark: "#b5004e",
      darkPlus: "#760033",
      contrastText: "#000000",
    },
  },
});
export default ThemeConfig;
