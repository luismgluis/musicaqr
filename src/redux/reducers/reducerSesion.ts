import Business from "../../classes/Business";
import User from "../../classes/User";

type InitialStateSesion = {
  currentUser: User;
  currentBusiness: Business;
};
const INITIAL_STATE: InitialStateSesion = {
  currentUser: new User(null, true),
  currentBusiness: new Business(null, true),
};
const reducerSesion = (
  state: InitialStateSesion = INITIAL_STATE,
  action: any
) => {
  switch (action.type) {
    case "setCurrentUser":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "setCurrentBusiness":
      return {
        ...state,
        currentBusiness: action.payload,
      };
    default:
      return state;
  }
};
export default reducerSesion;
