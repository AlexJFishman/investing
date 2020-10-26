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
  DB = "db",
  USER = "user"
}

const InstrumentComponent: FunctionComponent<Props> = observer(
  ({ instrument, listType }) => {
    const {
      dataStores: { userInstrumentsStore, usersStore }
    } = useStores();

    const itemClick = () => {
      if (!usersStore.connectedUser) {
        return;
      }
      if (listType === Types.DB) {
        const usedInstrument = _.find(
          userInstrumentsStore.instruments,
          (inst: Instrument) => {
            return inst.instrumentId === instrument.instrumentId;
          }
        );
        if (!usedInstrument) {
          UserService.addInstrument(
            instrument,
            usersStore.connectedUser.id,
            userInstrumentsStore
          );
        }
      } else {
        UserService.removeInstrument(
          instrument.instrumentId,
          usersStore.connectedUser.id,
          userInstrumentsStore
        );
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
