import {computed, observable, makeObservable} from "mobx";
import RootStore from "../../root-store";

export default class User {
    @observable
    id: number;

    @observable
    name: string;

    private rootStore: RootStore;

    constructor(id: number, name: string, rootStore: RootStore) {
        this.id = id;
        this.name = name;
        this.rootStore = rootStore;
        makeObservable(this)
    }

    @computed
    get instruments() {
        return this.rootStore.dataStores.userInstrumentsStore.getInstruments()
    }

}