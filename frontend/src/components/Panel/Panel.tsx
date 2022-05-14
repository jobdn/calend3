import { FC, useEffect } from "react";

import Admin from "../Admin/Admin";
import Calendar from "../Calendar/Calendar";
import { useDAppDispatch, useDAppSelector } from "../../hooks/redux";
import { contractData } from "../../store/actionCreators/contractData";

import "./Panel.scss";

const Panel: FC = () => {
  const { isAdmin } = useDAppSelector((state) => state.userReducer);

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
