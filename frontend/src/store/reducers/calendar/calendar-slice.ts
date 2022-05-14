import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAppointment } from "../../../models/IAppointment";
import { IContract } from "./types";

const initialState: IContract = {
  rate: 0,
  appointments: [] as IAppointment[],
  isLoading: false,
  error: "",
};

const calendarSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    setRate(state, action: PayloadAction<number>) {
      state.rate = action.payload;
    },
    setAppointments(state, action: PayloadAction<IAppointment[]>) {
      state.appointments = action.payload;
    },
  },
});

export const { setRate, setAppointments } = calendarSlice.actions;
export default calendarSlice.reducer;
