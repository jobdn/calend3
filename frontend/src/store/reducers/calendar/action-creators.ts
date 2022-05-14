import { DispatchType } from "../..";
import Calend3Service from "../../../services/Calend3Service";
import { setAppointments } from "./calendar-slice";

export const CalendarActionCreators = {
  appointments: () => async (dispatch: DispatchType) => {
    const appointments = await Calend3Service.getAppointments();
    console.log(appointments);

    dispatch(setAppointments(appointments));
  },
};
