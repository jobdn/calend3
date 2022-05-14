import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "./types";

const initialState: IUserState = {
  userAddress: "",
  isAdmin: false,
  isAuth: false,
  error: "",
  isLoading: false,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoading(state) {
      state.isLoading = true;
    },
    setUserAccount(state, action: PayloadAction<string>) {
      state.userAddress = action.payload;
      state.isLoading = false;
      state.isAuth = true;
    },
    setAdmin(state) {
      state.isAdmin = true;
    },
    thereIsNotConnnectedAccounts(state) {
      state.isLoading = false;
    },
    metamaskIsNotInstalled(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setUserAccount,
  metamaskIsNotInstalled,
  setIsLoading,
  thereIsNotConnnectedAccounts,
  setAdmin,
} = authSlice.actions;
export default authSlice.reducer;
