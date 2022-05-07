import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import DApp from "./DApp";
import { store } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <DApp />
  </Provider>
);
