import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IContract {
  rate: number;
}

const initialState: IContract = {
  rate: 0,
};

const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    setRate(state, action: PayloadAction<number>) {
      state.rate = action.payload;
    },
  },
});

export const { setRate } = contractSlice.actions;
export default contractSlice.reducer;
