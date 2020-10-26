import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores/helpers/use-stores";
import InstrumentsListComponent from "../instrument-list/instruments-list";
import Search from "../search/search";
import InstrumentServices from "../../services/instrument-services";

const TopViewComponent = () => {
  const {
    dataStores: { instrumentsStore }
  } = useStores();

  useEffect(() => {
    // get list from db
    InstrumentServices.getInstruments(instrumentsStore);
  }, []);

  return (
    <div className="top-view">
      <Search></Search>
      <InstrumentsListComponent
        listType="db"
        instruments={instrumentsStore.instruments}
      ></InstrumentsListComponent>
    </div>
  );
};

export default observer(TopViewComponent);
