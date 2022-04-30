import { FC, useEffect, useState } from "react";

import "./Panel.scss";
import Admin from "../Admin/Admin";
import Calendar from "../Calendar/Calendar";
import { IPanelProps } from "../../models/IPanelProps";
import { calend3Contract } from "../../helpers/Calend3.helper";
import { ethers } from "ethers";

const Panel: FC<IPanelProps> = ({ account }) => {
  const [rate, setRate] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getContractData = async () => {
      const ownerRate = await calend3Contract.getRate();
      setRate(parseFloat(ethers.utils.formatEther(ownerRate)));

      const owner = await calend3Contract.owner();
      setIsAdmin(owner.toUpperCase() === account.toUpperCase());
    };

    getContractData();
  }, [account]);

  const saveRate = async () => {
    await calend3Contract.setRate(ethers.utils.parseEther(rate.toString()));
  };

  return (
    <>
      {isAdmin && (
        <div>
          <Admin rate={rate} setRate={setRate} saveRate={saveRate} />
          <Calendar rate={rate} />
        </div>
      )}
      {!isAdmin && <Calendar rate={rate} />}
    </>
  );
};

export default Panel;
