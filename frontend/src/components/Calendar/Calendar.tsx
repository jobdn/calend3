import { FC, useState } from "react";
import { Scheduler } from "devextreme-react/scheduler";

import "devextreme/dist/css/dx.light.css";
import { AppointmentAddedEvent } from "devextreme/ui/scheduler";

interface IAppointment {
  text: string;
  startDate: Date;
  endDate: Date;
}

const Calendar: FC = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([
    {
      text: "Call",
      startDate: new Date(2022, 3, 29, 16, 45),
      endDate: new Date(2022, 3, 29, 17, 45),
    },
  ]);

  const onAddAppointment = (e: AppointmentAddedEvent) => {
    // TODO: here calend3 will be called
    console.log(e.appointmentData);
  };

  return (
    <Scheduler
      id="scheduler"
      defaultCurrentView={"week"}
      dataSource={appointments}
      views={[
        { type: "day", startDayHour: 10, endDayHour: 18 },
        {
          type: "week",
          startDayHour: 10,
          endDayHour: 18,
        },
        "month",
      ]}
      onAppointmentAdded={onAddAppointment}
      adaptivityEnabled={true}
    ></Scheduler>
  );
};

export default Calendar;
