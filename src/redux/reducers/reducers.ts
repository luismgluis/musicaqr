import { combineReducers } from "redux";
import reducerGeneralValues from "./reducerGeneralValues";
import reducerSesion from "./reducerSesion";

export default combineReducers({
  reducerGeneralValues,
  reducerSesion,
});
