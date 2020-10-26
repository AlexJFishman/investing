import React, { useState } from "react";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import "./login.css";

import { useStores } from "../../stores/helpers/use-stores";
import userServices from "../../services/user-services";
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
    <div className="login-container">
      <span className="login-text">Please enter your name to login:</span>
     
      <div className="login-group form__group field">
        <input
          type="input"
          className="form__field"
          placeholder="Name"
          name="name"
          id="name"
          value={typedName}
          onChange={e => setTypedName(e.target.value)}
        />
        <label className="form__label">Name</label>
      </div>
      {nameValidation ? <div  className="login-validation">You forgot to write your name</div> : null}
      <button className="button-green login-btn" onClick={login}> Login</button>
      <button className="button-green signup-btn" onClick={signUp}> SignUp</button>
    </div>
  );
};

export default observer(LoginComponent);
