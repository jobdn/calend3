import { Contract, ethers } from "ethers";
import calend3Artifact from "../contracts/Calend3.json";
import { config } from "../contracts/config";
import { ExternalProvider } from "@ethersproject/providers";
import { IAppointmentFromContract } from "../models/IAppointmentFromContract";
import { IAppointment } from "../models/IAppointment";

const calend3Abi = calend3Artifact.abi;

export default class Calend3Service {
  static async getContract(): Promise<Contract> {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum as ExternalProvider
    );

    const signer = provider.getSigner(0);

    const contract = new ethers.Contract(
      config.CALEND3_ADDRESS,
      calend3Abi,
      signer
    );
    return contract;
  }

  static async getRate(): Promise<number> {
    const contract = await Calend3Service.getContract();
    const rate = await contract.getRate();
    return parseFloat(ethers.utils.formatEther(rate));
  }

  static async getOwner(): Promise<string> {
    const contract = await Calend3Service.getContract();
    return await contract.owner();
  }

  static _fransformAppointments = (
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

  static async getAppointments(): Promise<IAppointment[]> {
    const contract = await Calend3Service.getContract();
    const contractAppointments = await contract.getAppoinments();
    return Calend3Service._fransformAppointments(contractAppointments);
  }

  static async setRate(rate: number): Promise<void> {
    const contract = await Calend3Service.getContract();
    await contract?.setRate(ethers.utils.parseEther(rate.toString()));
  }
}
