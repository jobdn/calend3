import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface IUserState {
  userAddress: string;
  isAuth: boolean;
  error: string;
  isLoading: boolean;
}

const initialState: IUserState = {
  userAddress: "",
  isAuth: false,
  error: "",
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authUser(state) {
      state.isLoading = true;
    },
    setUserAccount(state, action: PayloadAction<string>) {
      state.userAddress = action.payload;
      state.isLoading = false;
      state.error = "";
      state.isAuth = true;
    },
    thereIsNotConnnectedAccounts(state) {
      state.isAuth = false;
      state.isLoading = false;
    },
    metamaskIsNotInstalled(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuth = false;
      state.userAddress = "";
    },
  },
});

export const {
  setUserAccount,
  metamaskIsNotInstalled,
  authUser,
  thereIsNotConnnectedAccounts,
} = userSlice.actions;
export default userSlice.reducer;
