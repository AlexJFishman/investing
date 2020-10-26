import { action, observable, computed, makeObservable } from "mobx";
import User from "./user";
import RootStore from "../../root-store";

export default class UsersStore {
  @observable
  connectedUser: User | null;

  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.connectedUser = null;
    this.rootStore = rootStore;
    makeObservable(this)
  }

  getUserInstruments() {
    return this.rootStore.dataStores.userInstrumentsStore.instruments;
  }

  @computed
  get isLoggedIn() {
    return Boolean(this.connectedUser);
  }

  @computed
  get user(){
    if(this.connectedUser){
      return this.connectedUser;
    }
  }

  @action
  login(id: number, name: string) {
    const user = new User(id, name, this.rootStore);
    this.connectedUser = user;
  }
  @action
  logout() {
    if (this.connectedUser) {
      this.connectedUser = null;
    }
  }
}
