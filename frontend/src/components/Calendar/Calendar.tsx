import { FC, useEffect, useState } from "react";
import { Scheduler } from "devextreme-react/scheduler";
import { ethers } from "ethers";
import { AppointmentAddedEvent } from "devextreme/ui/scheduler";
import "devextreme/dist/css/dx.light.css";

import { calend3Contract } from "../../helpers/Calend3.helper";
import { IAppointment } from "../../models/IAppointment";
import { ICalendarProps } from "../../models/ICalendarProps";
import { IAppointmentFromContract } from "../../models/IAppointmentFromContract";

const Calendar: FC<ICalendarProps> = ({ rate }) => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  useEffect(() => {
    const getAppointmentFromContract = async () => {
      const appointmentsFromContract: IAppointmentFromContract[] =
        await calend3Contract.getAppoinments();
      const newAppointments = transformAppointmentData(
        appointmentsFromContract
      );
      setAppointments(newAppointments);
    };

    getAppointmentFromContract();
  }, []);

  const transformAppointmentData = (
    appointmentsFromContract: IAppointmentFromContract[]
  ): IAppointment[] => {
    return appointmentsFromContract.map((appointment) => {
      return {
        text: appointment.title,
        startDate: new Date(appointment.startTime * 1000),
        endDate: new Date(appointment.endTime * 1000),
      };
    });
  };

  const onAddAppointment = async (e: AppointmentAddedEvent) => {
    const approintment: IAppointment = {
      text: e.appointmentData.text as string,
      startDate: e.appointmentData.startDate as Date,
      endDate: e.appointmentData.endDate as Date,
    };

    const startTime = +approintment.startDate / 1000;
    const endTime = +approintment.endDate / 1000;
    const cost = ((endTime - startTime) / 60) * rate;
    try {
      await calend3Contract.addAppointment(
        approintment.text,
        startTime,
        endTime,
        {
          value: ethers.utils.parseEther(cost.toString()),
        }
      );
    } catch (error) {
      console.log(error);
    }
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
