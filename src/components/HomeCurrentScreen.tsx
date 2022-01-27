export type HomeCurrentScreen =
  | "BusinessScreen"
  | "UsersScreen"
  | "RoutersScreen"
  | "AddUser";

export type HomeGotoType = {
  screen: HomeCurrentScreen;
  name: string;
  parms?: any;
};
