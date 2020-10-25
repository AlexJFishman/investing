import UserInstrumentsStore from "./instruments/userInstruments-store";
import UsersStore from "./user/user-store";
import RootStore from "../root-store";
import InstrumentsStore from "./instruments/Instruments-store";

export default class DataStore {
    userInstrumentsStore: UserInstrumentsStore;
    usersStore: UsersStore;
    instrumentsStore: InstrumentsStore;

    constructor(rootStore: RootStore) {
        this.userInstrumentsStore = new UserInstrumentsStore(rootStore);
        this.usersStore = new UsersStore(rootStore);
        this.instrumentsStore = new InstrumentsStore(rootStore);
    }
}