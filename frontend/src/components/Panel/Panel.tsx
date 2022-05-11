import { FC, useEffect } from "react";

import "./Panel.scss";
import Admin from "../Admin/Admin";
import Calendar from "../Calendar/Calendar";
import { useDAppDispatch, useDAppSelector } from "../../hooks/redux";
import { contractData } from "../../store/actionCreators/contractData";

const Panel: FC = () => {
  const { isAdmin } = useDAppSelector((state) => state.userReducer);
  const { userAddress } = useDAppSelector((state) => state.userReducer);
  const dispatch = useDAppDispatch();

  useEffect(() => {
    dispatch(contractData(userAddress));
  }, []);

  return (
    <>
      {isAdmin && (
        <div>
          <Admin />
          <Calendar />
        </div>
      )}
      {!isAdmin && <Calendar />}
    </>
  );
};

export default Panel;
