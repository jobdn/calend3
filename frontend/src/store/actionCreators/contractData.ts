import { DispatchType } from "..";
import Calend3Service from "../../services/Calend3Service";
import { setRate } from "../reducers/ContractSlice";
import { setAdmin } from "../reducers/auth/auth-slice";

export const contractData =
  (userAccount: string) => async (dispatch: DispatchType) => {
    try {
      dispatch(setRate(await Calend3Service.getRate()));
      const owner = await Calend3Service.getOwner();

      if (owner.toUpperCase() === userAccount.toUpperCase()) {
        dispatch(setAdmin());
      }
    } catch (error) {
      console.log(error);
    }
  };
