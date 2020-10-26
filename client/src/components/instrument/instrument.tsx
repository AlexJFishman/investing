import React, { FunctionComponent } from "react";
import _ from "lodash";
import { observer } from "mobx-react-lite";

import { useStores } from "../../stores/helpers/use-stores";
import Instrument from "../../stores/data/instruments/instrument";
import UserService from "../../services/user-services";

interface Props {
  instrument: Instrument;
  listType: string;
}

enum Types {
  db = "db",
  user = "user"
}

const InstrumentComponent: FunctionComponent<Props> = observer(
  ({ instrument, listType }) => {
    const {
      dataStores: { userInstrumentsStore, usersStore }
    } = useStores();


    const itemClick = () => {
      if (listType === Types.db) {
        if (usersStore.connectedUser) {
          if (!userInstrumentsStore.instruments.includes(instrument)) {
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
      <div className={`inst-item ${listType}`} onClick={itemClick}>
        <div className="inst-name">{instrument.name}</div>
        <div className="inst-symbol">{instrument.symbol}</div>
        <div className="inst-type">{instrument.instrumentType}</div>
      </div>
    );
  }
);

export default InstrumentComponent;
