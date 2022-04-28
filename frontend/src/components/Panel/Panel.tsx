import { FC, useEffect, useState } from "react";

import "./Panel.scss";
import Admin from "../Admin/Admin";
import Calendar from "../Calendar/Calendar";
import { IPanelProps } from "../../models/IPanelProps";
import { calend3Contract } from "../../helpers/Calend3.helper";

const Panel: FC<IPanelProps> = ({ account }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAndSetIsAdmin = async () => {
      const owner = await calend3Contract.owner();
      setIsAdmin(owner.toUpperCase() === account.toUpperCase());
    };
    checkAndSetIsAdmin();
  }, [account]);

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
