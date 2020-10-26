import { observable, makeObservable } from "mobx";
import RootStore from "../../root-store";

export default class Instrument {
  @observable
  instrumentId: number;

  @observable
  name: string;

  @observable
  symbol: string;

  @observable
  instrumentType: string;

  private rootStore: RootStore;

  constructor(
    instrumentId: number,
    name: string,
    symbol: string,
    instrumentType: string,
    rootStore: RootStore
  ) {
    this.instrumentId = instrumentId;
    this.name = name;
    this.instrumentType = instrumentType;
    this.symbol = symbol;
    this.rootStore = rootStore;
    makeObservable(this);
  }

  remove() {
    this.rootStore.dataStores.userInstrumentsStore.removeInstrument(
      this.instrumentId
    );
  }
}
