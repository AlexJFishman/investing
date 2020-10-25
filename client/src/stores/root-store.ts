import DataStore from "./data/data-stores";

export default class RootStore {
    // ad ui store when needed
    dataStores: DataStore;

    constructor() {
        this.dataStores = new DataStore(this);
    }
}
