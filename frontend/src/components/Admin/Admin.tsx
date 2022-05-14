import { Box, Button, Slider, Stack } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { FC } from "react";

import { useDAppDispatch, useDAppSelector } from "../../hooks/redux";
import { setRate } from "../../store/reducers/calendar/calendar-slice";
import Calend3Service from "../../services/Calend3Service";
import { marks } from "./marks";

import "./Admin.scss";

const Admin: FC = () => {
  const { rate } = useDAppSelector((state) => state.contractReducer);
  const dispatch = useDAppDispatch();

  const handleSliderChange: (
    event: Event | React.SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => void | undefined = (event, value) => {
    dispatch(setRate(value as number));
  };

  const saveRate = async () => {
    await Calend3Service.setRate(rate);
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
