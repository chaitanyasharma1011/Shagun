"use client";
import { Provider } from "react-redux";
// import apiInvestEdgeSlice from "@/services/apiInvestEdgeSlice";
import store from "./store";

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
