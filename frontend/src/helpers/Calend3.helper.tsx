import { ExternalProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { config } from "../contracts/config";
import calend3Artifact from "../contracts/Calend3.json";

const calend3Abi = calend3Artifact.abi;
const provider = new ethers.providers.Web3Provider(
  window.ethereum as ExternalProvider
);

const signer = provider.getSigner(0);
export const calend3Contract = new ethers.Contract(
  config.CALEND3_ADDRESS,
  calend3Abi,
  signer
);
