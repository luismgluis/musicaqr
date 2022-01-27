// import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers/reducers";

const store = createStore(
  reducers, // Reducers
  {}, // Estado inicial
  applyMiddleware(reduxThunk)
);
export default store;
