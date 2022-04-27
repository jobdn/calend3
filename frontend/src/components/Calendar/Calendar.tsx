import React, { FC, useEffect, useState } from "react";
import { ExternalProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { config } from "../../contracts/config";
import calend3Artifact from "../../contracts/Calend3.json";

import "./Calendar.scss";
import { ICalendarProps } from "../../models/ICalendarProps";

const calend3Abi = calend3Artifact.abi;
const provider = new ethers.providers.Web3Provider(
  window.ethereum as ExternalProvider
);
const calend3Contract = new ethers.Contract(
  config.CALEND3_ADDRESS,
  calend3Abi,
  provider
);

const Calendar: FC<ICalendarProps> = ({ account }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [rate, setRate] = useState(0);
  const getData = async () => {
    const owner = await calend3Contract.owner();
    setIsAdmin(owner.toUpperCase() === account.toUpperCase());
    const rate = await calend3Contract.getRate();
    console.log(rate);
  };

  return (
    <div id="calendar">
      Calendar <button onClick={getData}>RAte</button>
    </div>
  );
};

export default Calendar;
