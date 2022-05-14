import { FC } from "react";

import Admin from "../Admin/Admin";
import Calendar from "../Calendar/Calendar";
import { useDAppSelector } from "../../hooks/redux";

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
