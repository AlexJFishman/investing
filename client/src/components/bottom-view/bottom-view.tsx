import React from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores/helpers/use-stores";
import LoginComponent from "../login/login";
import InstrumentsListComponent from "../instrument-list/instruments-list";

const BottomViewComponent = () => {
  const {
    dataStores: { userInstrumentsStore, usersStore, instrumentsStore }
  } = useStores();
  return (
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
  );
};

export default observer(BottomViewComponent);
