import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { DispatchType, StateType } from "../store";

export const useDAppDispatch = () => useDispatch<DispatchType>();
export const useDAppSelector: TypedUseSelectorHook<StateType> = useSelector;
