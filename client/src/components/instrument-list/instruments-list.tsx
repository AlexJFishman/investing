import React, { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import Instrument from "../../stores/data/instruments/instrument";
import InstrumentComponent from "../instrument/instrument";
import './list.css';

interface Props {
  listType: string;
  instruments: Instrument[];
}

enum Types {
  db = "db",
  user = "user"
}

const InstrumentsListComponent: FunctionComponent<Props> = observer(
  ({ instruments, listType }) => {
    const listHeader =
      listType === Types.db
        ? "Choose instruments you wish to follow"
        : "Your instruments";

    return (
      <div className="inst-list">
        <div className="list-header">{listHeader}</div>
        {instruments.map(inst => (
          <InstrumentComponent
            key={inst.instrumentId}
            instrument={inst}
            listType={listType}
          />
        ))}
      </div>
    );
  }
);

export default InstrumentsListComponent;
