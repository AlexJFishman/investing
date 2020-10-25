import React from "react";
import _ from "lodash";
import { useStores } from "../stores/helpers/use-stores";
import InstrumentServices from "../services/instrument-services";
import { observer } from "mobx-react-lite";

const Search = () => {
  const {
    dataStores: { instrumentsStore }
  } = useStores();
  const onSearchChange = (value: string) => {
    if (value.length === 0) {
      instrumentsStore.clearList();
      InstrumentServices.getInstruments(instrumentsStore);
    } else {
      instrumentsStore.clearList();
      InstrumentServices.getInstrumentsByFilter(instrumentsStore, value);
    }
  };

  const debouncedSearch = _.debounce(onSearchChange, 300);

  return (
    <div>
      <input
        className=""
        type="text"
        onChange={e => debouncedSearch(e.target.value)}
      />
    </div>
  );
};

export default observer(Search);
