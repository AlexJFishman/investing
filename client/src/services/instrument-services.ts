import InstrumentsStore from "../stores/data/instruments/Instruments-store";
export default {
  async getInstruments(instrumentsStore: InstrumentsStore) {
    fetch(`http://localhost:8000/api/instruments/`)
      .then(res => res.json())
      .then(
        result => {
          instrumentsStore.addInstruments(result.data);
        },
        error => {
          // some kind of client error modal
          console.log(`ERROR! ${error}`);
        }
      );
  },
  async getInstrumentsByFilter(
    instrumentsStore: InstrumentsStore,
    filter: string = ""
  ) {
    fetch(`http://localhost:8000/api/instruments/search/${filter}`)
      .then(res => res.json())
      .then(
        result => {
          instrumentsStore.addInstruments(result.data);
        },
        error => {
          // some kind of client error modal
          console.log(`ERROR! ${error}`);
        }
      );
  }
};
