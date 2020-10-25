import React, { FunctionComponent } from "react";
import _ from "lodash";
import { observer } from "mobx-react-lite";

import { useStores } from "../stores/helpers/use-stores";
import Instrument from "../stores/data/instruments/instrument";
import UserService from "../services/user-services";

interface Props {
  instrument: Instrument;
  listType: string;
}
const InstrumentComponent: FunctionComponent<Props> = observer(
  ({ instrument, listType }) => {
    const {
      dataStores: { userInstrumentsStore, usersStore }
    } = useStores();

    const itemClick = () => {
      if (listType === "db") {
        if (usersStore.isLoggedIn && usersStore.connectedUser) {
          if(!userInstrumentsStore.instrumentsList.includes(instrument)){
            UserService.addInstrument(
              instrument,
              usersStore.connectedUser.id,
              userInstrumentsStore
            );
          }
        }
      } else {
        if (usersStore.connectedUser) {
          UserService.removeInstrument(
            instrument.instrumentId,
            usersStore.connectedUser.id,
            userInstrumentsStore
          );
        }
      }
    };

    return (
      <div className="inst-item" onClick={itemClick}>
        {instrument.name}
      </div>
    );
  }
);

export default InstrumentComponent;
