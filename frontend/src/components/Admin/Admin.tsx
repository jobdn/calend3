import { Box, Button, Slider, Stack } from "@mui/material";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

import { calend3Contract } from "../../helpers/Calend3.helper";
import { marks } from "./marks";

import "./Admin.scss";

const Admin = () => {
  const [rate, setRate] = useState(0);

  const handleSliderChange: (
    event: Event | React.SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => void | undefined = (event, value) => {
    setRate(value as number);
  };

  const saveRate = async () => {
    await calend3Contract.setRate(ethers.utils.parseEther(rate.toString()));
  };

  useEffect(() => {
    const getAndSetRate = async () => {
      const rate = await calend3Contract.getRate();
      setRate(parseFloat(ethers.utils.formatEther(rate)));
    };
    getAndSetRate();
  }, []);

  return (
    <div className="admin">
      <Box>
        <h3>Set Your Minutely Rate: </h3>
        <Stack className="admin__slider">
          <Slider
            sx={{
              "& .MuiSlider-markLabel": {
                color: "#fff",
              },
            }}
            marks={marks}
            value={rate}
            step={0.001}
            min={0}
            max={0.1}
            valueLabelDisplay="auto"
            onChange={handleSliderChange}
          />
        </Stack>
        <Button variant="contained" size="large" onClick={saveRate}>
          Set Configuration
        </Button>
      </Box>
    </div>
  );
};

export default Admin;
