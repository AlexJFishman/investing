import React, { useState, useEffect } from "react";
import "./App.css";
import { useStores } from "./stores/helpers/use-stores";
import Search from "./components/search";
import InstrumentsListComponent from "./components/instruments-list";
import Instrument from "./stores/data/instruments/instrument";
import LoginComponent from "./components/login";
import { observer } from "mobx-react-lite";
import UserService from './services/user-services';
import InstrumentServices from './services/instrument-services';
const App = () => {
  const {
    dataStores: { userInstrumentsStore, usersStore, instrumentsStore }
  } = useStores();
  const dbInstruments: Instrument[] = [];

  useEffect(() => {
    // get list from db
    InstrumentServices.getInstruments(instrumentsStore);
  }, [])

  return (
    <div className="main-container">
      <div className="top-view">
        <Search></Search>
        <InstrumentsListComponent
          listType="db"
          instruments={instrumentsStore.instrumentsList}
        ></InstrumentsListComponent>
      </div>
      <div className="bottom-view">
        {usersStore.isLoggedIn ? (
          <InstrumentsListComponent
            instruments={userInstrumentsStore.getInstruments()}
            listType="user"
          ></InstrumentsListComponent>
        ) : (
          <LoginComponent></LoginComponent>
        )}
      </div>
    </div>
  );
};

export default observer(App);
