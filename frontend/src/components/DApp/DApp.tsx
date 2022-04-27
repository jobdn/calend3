import { useEffect, useState } from "react";
import { ExternalProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import detectedEthereumProvider from "@metamask/detect-provider";

import calend3Artifact from "../../contracts/Calend3.json";
import { config } from "../../contracts/config";
import Calendar from "../Calendar/Calendar";
import "./DApp.scss";

const calend3Abi = calend3Artifact.abi;
const provider = new ethers.providers.Web3Provider(
  window.ethereum as ExternalProvider
);

const calend3Contract = new ethers.Contract(
  config.CALEND3_ADDRESS,
  calend3Abi,
  provider
);

const DApp: React.FC = () => {
  const [account, setAccount] = useState<string>("");
  const [auth, setAuth] = useState<boolean>(false);

  console.log(calend3Contract);

  useEffect(() => {
    const isAuth = async () => {
      const provider = await detectedEthereumProvider();
      const accounts = await (provider as any).request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setAuth(true);
      } else {
        console.log("Not authorized account found");
      }
    };

    isAuth();
  }, []);

  const onConnect: React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const provider = await detectedEthereumProvider();

      const accounts = await (provider as any).request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        setAuth(true);
        setAccount(accounts[0]);
      } else {
        console.log("Not account found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="DApp">
      <header className="DApp-header">
        <h1>calend3</h1>
        <p id="slogan">Web3 appointment scheduler</p>
      </header>

      {auth ? (
        <Calendar />
      ) : (
        <button onClick={onConnect}>connect wallet</button>
      )}
    </div>
  );
};

export default DApp;
