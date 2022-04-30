import { Box, Button, Slider, Stack } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { FC } from "react";

import { marks } from "./marks";

import { IAdminProps } from "../../models/IAdminProps";

import "./Admin.scss";

const Admin: FC<IAdminProps> = ({ rate, setRate, saveRate }) => {
  const handleSliderChange: (
    event: Event | React.SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => void | undefined = (event, value) => {
    setRate(value as number);
  };

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
            defaultValue={rate}
            marks={marks}
            step={0.001}
            min={0}
            max={0.1}
            valueLabelDisplay="auto"
            onChangeCommitted={handleSliderChange}
          />
        </Stack>
        <Button variant="contained" size="large" onClick={saveRate}>
          <SettingsIcon className="admin__settings-btn" />
          Set Configuration
        </Button>
      </Box>
    </div>
  );
};

export default Admin;
