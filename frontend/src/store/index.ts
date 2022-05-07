import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/UserSlice";

const rootReducer = combineReducers({ userReducer });

export const store = configureStore({
  reducer: rootReducer,
});

export type StateType = ReturnType<typeof rootReducer>;
export type DispatchType = typeof store.dispatch;
