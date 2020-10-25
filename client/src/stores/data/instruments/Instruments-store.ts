import { action, observable, makeObservable } from "mobx";
import RootStore from "../../root-store";
import Instrument from "./instrument";

export default class InstrumentsStore {
  @observable
  instrumentsList: Instrument[] = [];

  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @action
  addInstrument(instrument: Instrument) {
    this.instrumentsList.push(instrument);
  }

  @action
  clearList() {
    this.instrumentsList = [];
  }

  @action
  addInstruments(instruments: [] = []) {
    instruments.forEach(inst => {
      const { id, name, symbol, instrumentType } = inst;
      const _instrument = new Instrument(
        id,
        name,
        symbol,
        instrumentType,
        this.rootStore
      );
      this.addInstrument(_instrument);
    });
  }

  getInstruments() {
    return this.instrumentsList;
  }

  getInstrument(instrumentId: number) {
    return this.instrumentsList.find(
      inst => inst.instrumentId === instrumentId
    );
  }
}
