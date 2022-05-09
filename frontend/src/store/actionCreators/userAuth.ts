import detectEthereumProvider from "@metamask/detect-provider";
import { DispatchType } from "..";
import {
  authUser,
  setUserAccount,
  metamaskIsNotInstalled,
  thereIsNotConnnectedAccounts,
} from "../reducers/UserSlice";

export const userAuth =
  (providerRequest: string) => async (dispatch: DispatchType) => {
    dispatch(authUser());

    const provider = await detectEthereumProvider();
    if (provider) {
      const accounts = await (provider as any).request({
        method: providerRequest,
      });
      if (accounts.length > 0) {
        dispatch(setUserAccount(accounts[0]));
      } else {
        dispatch(thereIsNotConnnectedAccounts());
      }
    } else {
      dispatch(metamaskIsNotInstalled("Please install Metamask extension"));
    }
  };
