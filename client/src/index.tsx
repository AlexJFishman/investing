import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore } from "./stores/helpers/create-store";
import { StoreProvider } from "./stores/helpers/store-context";
import Instrument from "./stores/data/instruments/instrument";

const rootStore = createStore();

rootStore.dataStores.userInstrumentsStore.addInstrument(
  new Instrument(1, "Euro US Dollar", "EUR/USD", "currency", rootStore)
);

ReactDOM.render(
  <StoreProvider value={rootStore}>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);
