import "./DApp.scss";
import Panel from "./components/Panel/Panel";
import { useDAppDispatch, useDAppSelector } from "./hooks/redux";
import { userAuth } from "./store/actionCreators/userAuth";
import { useEffect } from "react";

const DApp: React.FC = () => {
  const dispatch = useDAppDispatch();
  const { error, isLoading, isAuth, userAddress } = useDAppSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    dispatch(userAuth("eth_accounts"));
  }, []);

  const onConnect: React.MouseEventHandler<HTMLButtonElement> = async () => {
    dispatch(userAuth("eth_requestAccounts"));
  };

  console.log(isLoading);

  if (isLoading) return <h1>Page is loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="DApp">
      <header className="DApp-header">
        <h1>calend3</h1>
        <p id="slogan">Web3 appointment scheduler</p>
      </header>

      {isAuth && <Panel account={userAddress} />}
      {!isAuth && <button onClick={onConnect}>connect wallet</button>}
    </div>
  );
};

export default DApp;
