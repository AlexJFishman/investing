import React, { useState } from "react";
import _ from "lodash";
import { observer } from "mobx-react-lite";

import { useStores } from "../stores/helpers/use-stores";
import userServices from "../services/user-services";
const LoginComponent = () => {
  const [nameValidation, setNameValidation] = useState(false);
  const [typedName, setTypedName] = useState("");
  const {
    dataStores: { usersStore, userInstrumentsStore }
  } = useStores();
  const login = () => {
    if (typedName) {
      userServices.login(typedName, usersStore, userInstrumentsStore);
    } else {
      setNameValidation(true);
    }
  };

  const signUp = () => {
    if (typedName) {
      userServices.signUp(typedName, usersStore);
    } else {
      setNameValidation(true);
    }
  };
  return (
    <div>
      Please enter your name to login:
      {nameValidation ? <div>You forgot to write your name</div> : null}
      <input
        type="text"
        value={typedName}
        onChange={e => setTypedName(e.target.value)}
      />
      <button onClick={login}> Login</button>
      <button onClick={signUp}> SignUp</button>
    </div>
  );
};

export default observer(LoginComponent);
