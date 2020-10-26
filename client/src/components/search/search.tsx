import React from "react";
import _ from "lodash";
import { useStores } from "../../stores/helpers/use-stores";
import InstrumentServices from "../../services/instrument-services";
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
    <div className="search form__group field">
      <input
        type="input"
        className="form__field"
        placeholder="Filter"
        name="Filter"
        id="Filter"
        onChange={e => debouncedSearch(e.target.value)}
      />
      <label className="form__label">Filter</label>
    </div>
  );
};

export default observer(Search);
