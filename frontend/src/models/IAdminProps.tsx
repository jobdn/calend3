import { Dispatch, SetStateAction } from "react";

export interface IAdminProps {
  rate: number;
  setRate: Dispatch<SetStateAction<number>>;
  saveRate: () => Promise<void>;
}
