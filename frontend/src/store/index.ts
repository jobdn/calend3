import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/UserSlice";
import contractReducer from "./reducers/ContractSlice";

const rootReducer = combineReducers({ userReducer, contractReducer });

export const store = configureStore({
  reducer: rootReducer,
});

export type StateType = ReturnType<typeof rootReducer>;
export type DispatchType = typeof store.dispatch;
