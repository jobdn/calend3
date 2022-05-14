import { IAppointment } from "../../../models/IAppointment";

export interface IContract {
  rate: number;
  appointments: IAppointment[];
  isLoading: boolean;
  error: string;
}
