/*
this will have the list design
will have a property telling which kind of actions to take add/delete passing to child

*/
/* 
this component will have a design of one item
on hover it will have the corresponding action add/delete
*/ import React, {
  useState,
  FunctionComponent
} from "react";
import _ from "lodash";
import { observer } from "mobx-react-lite";

import { useStores } from "../stores/helpers/use-stores";
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
