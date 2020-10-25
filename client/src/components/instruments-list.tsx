import React, { FunctionComponent } from "react";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import Instrument from "../stores/data/instruments/instrument";
import InstrumentComponent from "./instrument";

interface Props {
  listType: string;
  instruments: Instrument[];
}
const InstrumentsListComponent: FunctionComponent<Props> = observer(
  ({ instruments, listType }) => {
    return (
      <div className="inst-list">
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
