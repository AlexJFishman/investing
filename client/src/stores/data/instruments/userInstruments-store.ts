import {action, observable, makeObservable} from "mobx";
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
    addInstrumentsById(ids: number[]){
        const filteredInts = _.filter(this.rootStore.dataStores.instrumentsStore.instrumentsList, (inst: Instrument) => {
            return ids.includes(inst.instrumentId);
        });
        _.forEach(filteredInts, (instrument) => {
            this.addInstrument(instrument);
        });
    }

    getInstruments() {
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