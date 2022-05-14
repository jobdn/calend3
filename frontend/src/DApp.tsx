import { useEffect } from "react";

import { useDAppDispatch, useDAppSelector } from "./hooks/redux";
import Panel from "./components/Panel/Panel";
import { auth } from "./store/reducers/auth/action-creators";

import "./DApp.scss";

const DApp: React.FC = () => {
  const { error, isLoading, isAuth } = useDAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useDAppDispatch();

  useEffect(() => {
    dispatch(auth("eth_accounts"));
  }, []);

  const onConnect: React.MouseEventHandler<HTMLButtonElement> = async () => {
    dispatch(auth("eth_requestAccounts"));
  };

  if (isLoading) return <h1>Page is loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="DApp">
      <header className="DApp-header">
        <h1>calend3</h1>
        <p id="slogan">Web3 appointment scheduler</p>
      </header>

      {isAuth && <Panel />}
      {!isAuth && <button onClick={onConnect}>connect wallet</button>}
    </div>
  );
};

export default DApp;
