import { Contract, ethers } from "ethers";
import calend3Artifact from "../contracts/Calend3.json";
import { config } from "../contracts/config";
import { ExternalProvider } from "@ethersproject/providers";

const calend3Abi = calend3Artifact.abi;

export default class Calend3Service {
  static async getContract(): Promise<Contract | null> {
    if (typeof window.ethereum === "undefined") {
      return null;
    }

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

  static async getRate() {
    const contract = await Calend3Service.getContract();
    const rate = await contract?.getRate();
    return parseFloat(ethers.utils.formatEther(rate));
  }

  static async getOwner() {
    const contract = await Calend3Service.getContract();
    return await contract?.owner();
  }

  static async setRate(rate: number) {
    const contract = await Calend3Service.getContract();
    await contract?.setRate(ethers.utils.parseEther(rate.toString()));
  }
}
