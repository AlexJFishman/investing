import {action, observable, makeObservable, computed} from "mobx";
import RootStore from "../../root-store";
import Instrument from "./instrument";
import _ from 'lodash';

export default class UserInstrumentsStore {
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
    addInstruments(instruments: [] = []){
        _.forEach(instruments, (inst) => {
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
    
    @computed
    get instruments() {
        return this.instrumentsList;
    }

    getInstrument(instrumentId: number) {
        return this.instrumentsList.find(inst => inst.instrumentId === instrumentId);
    }

    @action
    removeInstrument(instrumentId: number) {
        const instToRemove = this.getInstrument(instrumentId);

        if (instToRemove) {
            const todoToRemoveIndex = this.instrumentsList.indexOf(instToRemove);
            this.instrumentsList.splice(todoToRemoveIndex, 1);
        }
    }
}