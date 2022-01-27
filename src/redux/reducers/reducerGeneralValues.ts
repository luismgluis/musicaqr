import {
  HomeCurrentScreen,
  HomeGotoType,
} from "../../components/HomeCurrentScreen";
import { AlertType } from "../../components/ui/Alert/useAlert";

type InitialState = {
  totalHeight: number;
  theme: number;
  alertsViewRef: any | null;
  language: string;
  homeGoTo: HomeGotoType;
  alertData: AlertType;
};
const INITIAL_STATE: InitialState = {
  totalHeight: 0,
  theme: 0,
  alertsViewRef: null,
  language: "",
  homeGoTo: {
    screen: "BusinessScreen",
    name: "Empresas",
    parms: null,
  },
  alertData: {
    enabled: false,
  },
};
const reducerGeneralValues = (
  state: InitialState = INITIAL_STATE,
  action: any
) => {
  switch (action.type) {
    case "setTheme":
      action = {
        ...state,
        theme: action.payload,
      };
      return action;
    case "setLanguage":
      action = {
        ...state,
        language: action.payload,
      };
      return action;
    case "setAlertData":
      action = {
        ...state,
        alertData: action.payload,
      };
      return action;
    case "setHomeNavigation":
      action = {
        ...state,
        homeGoTo: action.payload,
      };
      return action;
    default:
      return state;
  }
};
export default reducerGeneralValues;
