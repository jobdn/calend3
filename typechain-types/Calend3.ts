/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export declare namespace Calend3 {
  export type AppointmentStruct = {
    title: string;
    attendee: string;
    startTime: BigNumberish;
    endTime: BigNumberish;
    amountPaid: BigNumberish;
  };

  export type AppointmentStructOutput = [
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    title: string;
    attendee: string;
    startTime: BigNumber;
    endTime: BigNumber;
    amountPaid: BigNumber;
  };
}

export interface Calend3Interface extends utils.Interface {
  functions: {
    "addAppointment(string,uint256,uint256)": FunctionFragment;
    "getAppoinments()": FunctionFragment;
    "getRate()": FunctionFragment;
    "owner()": FunctionFragment;
    "setRate(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addAppointment"
      | "getAppoinments"
      | "getRate"
      | "owner"
      | "setRate"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addAppointment",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAppoinments",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getRate", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setRate",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "addAppointment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAppoinments",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getRate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRate", data: BytesLike): Result;

  events: {};
}

export interface Calend3 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: Calend3Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addAppointment(
      _title: string,
      _startTime: BigNumberish,
      _endTime: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAppoinments(
      overrides?: CallOverrides
    ): Promise<
      [Calend3.AppointmentStructOutput[]] & {
        _appointments: Calend3.AppointmentStructOutput[];
      }
    >;

    getRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    setRate(
      _rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addAppointment(
    _title: string,
    _startTime: BigNumberish,
    _endTime: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAppoinments(
    overrides?: CallOverrides
  ): Promise<Calend3.AppointmentStructOutput[]>;

  getRate(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  setRate(
    _rate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addAppointment(
      _title: string,
      _startTime: BigNumberish,
      _endTime: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getAppoinments(
      overrides?: CallOverrides
    ): Promise<Calend3.AppointmentStructOutput[]>;

    getRate(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    setRate(_rate: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    addAppointment(
      _title: string,
      _startTime: BigNumberish,
      _endTime: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAppoinments(overrides?: CallOverrides): Promise<BigNumber>;

    getRate(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    setRate(
      _rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addAppointment(
      _title: string,
      _startTime: BigNumberish,
      _endTime: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAppoinments(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setRate(
      _rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
