import "./DApp.scss";
import detectedEthereumProvider from "@metamask/detect-provider";
import { useState } from "react";

const DApp: React.FC = () => {
  const [account, setAccount] = useState<string>("");
  const [auth, setAuth] = useState<boolean>(false);

  const onConnect: React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const provider = await detectedEthereumProvider();

      const accounts = await (provider as any).request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        console.log(accounts);

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
        <div>show calendar component</div>
      ) : (
        <button onClick={onConnect}>connect wallet</button>
      )}
    </div>
  );
};

export default DApp;
