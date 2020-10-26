import UserInstrumentsStore from "../stores/data/instruments/userInstruments-store";
import Instrument from "../stores/data/instruments/instrument";
import UsersStore from "../stores/data/user/user-store";
import _ from "lodash";

export default {
  async addInstrument(
    instrument: Instrument,
    userId: number,
    userInstrumentsStore: UserInstrumentsStore
  ) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, instrumentId: instrument.instrumentId })
    };
    fetch("http://localhost:8000/api/lists/", requestOptions)
      .then(res => res.json())
      .then(
        result => {
          userInstrumentsStore.addInstrument(instrument);
        },
        error => {
          // some kind of client error modal
          console.log(`ERROR! ${error}`);
        }
      );
  },
  async removeInstrument(
    instrumentId: number,
    userId: number,
    userInstrumentsStore: UserInstrumentsStore
  ) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, instrumentId: instrumentId })
    };
    fetch("http://localhost:8000/api/lists/", requestOptions)
      .then(res => res.json())
      .then(
        result => {
          userInstrumentsStore.removeInstrument(instrumentId);
        },
        error => {
          // some kind of client error modal
          console.log(`ERROR! ${error}`);
        }
      );
  },
  async login(
    name: string,
    usersStore: UsersStore,
    userInstrumentsStore: UserInstrumentsStore
  ) {
    fetch(`http://localhost:8000/api/users/${name}`)
      .then(res => res.json())
      .then(
        result => {
          if (result.status === 404) {
            // error modal
            alert(result.error);
            return;
          }
          const { user, list } = result.data;
          usersStore.login(user.id, user.name);
          userInstrumentsStore.addInstruments(list);
        },
        error => {
          // some kind of client error modal
          console.log(`ERROR! ${error}`);
        }
      );
  },
  async signUp(name: string, usersStore: UsersStore) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    };

    fetch("http://localhost:8000/api/users/", requestOptions)
      .then(res => res.json())
      .then(
        result => {
          usersStore.login(result.data.id, result.data.name);
        },
        error => {
          // some kind of client error modal
          console.log(`ERROR! ${error}`);
        }
      );
  }
};
