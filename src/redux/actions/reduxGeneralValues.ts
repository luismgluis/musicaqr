import { AlertType } from "../../components/ui/Alert/useAlert";
import { HomeCurrentScreen } from "./../../components/HomeCurrentScreen";

const setTotalHeight = (totalHeight: number) => (dispatch: any) => {
  dispatch({
    type: "setTotalHeight",
    payload: totalHeight,
  });
};

const setTheme = (themeNum: number) => (dispatch: any) => {
  dispatch({
    type: "setTheme",
    payload: themeNum,
  });
};

const setLanguage = (language: string) => (dispatch: any) => {
  dispatch({
    type: "setLanguage",
    payload: language,
  });
};

const setHomeNavigation =
  (screen: HomeCurrentScreen, name: string, parms: any) => (dispatch: any) => {
    dispatch({
      type: "setHomeNavigation",
      payload: { screen: screen, parms: parms, name: name },
    });
  };
const setAlertData = (data: AlertType) => (dispatch: any) => {
  dispatch({
    type: "setAlertData",
    payload: data,
  });
};

export const reduxGeneralValues = {
  setTotalHeight,
  setTheme,
  setLanguage,
  setHomeNavigation,
  setAlertData,
};
