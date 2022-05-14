import detectEthereumProvider from "@metamask/detect-provider";

import { DispatchType } from "../..";
import Calend3Service from "../../../services/Calend3Service";
import { setRate } from "../calendar/calendar-slice";
import {
  metamaskIsNotInstalled,
  setAdmin,
  setIsLoading,
  setUserAccount,
  thereIsNotConnnectedAccounts,
} from "./auth-slice";

export const auth =
  (providerRequest: string) => async (dispatch: DispatchType) => {
    dispatch(setIsLoading());

    const provider = await detectEthereumProvider();
    if (provider) {
      const accounts = await (provider as any).request({
        method: providerRequest,
      });
      if (accounts.length > 0) {
        dispatch(setUserAccount(accounts[0]));

        dispatch(setRate(await Calend3Service.getRate()));
        const owner = await Calend3Service.getOwner();
        if (owner.toUpperCase() === accounts[0].toUpperCase()) {
          dispatch(setAdmin());
        }
      } else {
        dispatch(thereIsNotConnnectedAccounts());
      }
    } else {
      dispatch(metamaskIsNotInstalled("Please install Metamask extension"));
    }
  };
