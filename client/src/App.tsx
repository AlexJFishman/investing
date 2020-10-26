import React, { useEffect } from "react";
import "./App.css";
import { useStores } from "./stores/helpers/use-stores";
import Search from "./components/search/search";
import InstrumentsListComponent from "./components/instrument-list/instruments-list";
import LoginComponent from "./components/login/login";
import { observer } from "mobx-react-lite";
import InstrumentServices from "./services/instrument-services";
const App = () => {
  const {
    dataStores: { userInstrumentsStore, usersStore, instrumentsStore }
  } = useStores();

  useEffect(() => {
    // get list from db
    InstrumentServices.getInstruments(instrumentsStore);
  }, []);

  return (
    <div className="main-container">
      <div className="top-view">
        <Search></Search>
        <InstrumentsListComponent
          listType="db"
          instruments={instrumentsStore.instruments}
        ></InstrumentsListComponent>
      </div>
      <div className="bottom-view">
        {usersStore.isLoggedIn ? (
          <InstrumentsListComponent
            instruments={userInstrumentsStore.instruments}
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
