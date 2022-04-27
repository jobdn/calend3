import React, { FC, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { Box, Slider } from "@mui/material";
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

  useEffect(() => {
    const getData = async () => {
      const owner = await calend3Contract.owner();
      setIsAdmin(owner.toUpperCase() === account.toUpperCase());

      const rate = await calend3Contract.getRate();
      setRate(rate);
    };

    getData();
  }, []);

  const valueText = (value: number) => {
    return `${value} ETH`;
  };

  const handleSliderChange: (
    event: Event | React.SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => void | undefined = (event, value) => {
    setRate(value as number);
  };

  return (
    <div>
      {isAdmin ? (
        <div className="admin">
          <Box>
            <h3>Set Your Minutely Rate: </h3>
            <Stack>
              <Slider
                marks
                step={0.001}
                min={0}
                max={0.1}
                getAriaValueText={valueText}
                onChangeCommitted={handleSliderChange}
                valueLabelDisplay="auto"
              />
            </Stack>
          </Box>
        </div>
      ) : (
        <div id="calendar">Calendar</div>
      )}
    </div>
  );
};

export default Calendar;
