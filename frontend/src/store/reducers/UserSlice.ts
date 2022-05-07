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
    authUserSucces(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = "";
      state.isAuth = true;
      state.userAddress = action.payload;
    },
    metamaskIsNotInstalled(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuth = false;
      state.userAddress = "";
    },
  },
});

export const { authUserSucces, metamaskIsNotInstalled, authUser } =
  userSlice.actions;
export default userSlice.reducer;
