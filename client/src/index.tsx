import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore } from "./stores/helpers/create-store";
import { StoreProvider } from "./stores/helpers/store-context";

const rootStore = createStore();

ReactDOM.render(
  <StoreProvider value={rootStore}>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);
