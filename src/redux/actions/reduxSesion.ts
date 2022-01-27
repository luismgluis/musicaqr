import User from "../../classes/User";

const setCurrentUser = (user: User) => (dispatch: any) => {
  dispatch({
    type: "setCurrentUser",
    payload: user,
  });
};
const setCurrentBusiness = (user: User) => (dispatch: any) => {
  dispatch({
    type: "setCurrentBusiness",
    payload: user,
  });
};
export const reduxSesion = {
  setCurrentUser,
  setCurrentBusiness,
};
