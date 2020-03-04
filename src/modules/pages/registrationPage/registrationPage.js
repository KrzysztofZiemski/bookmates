import React from "react";
import "./registrationPage.scss";
import { addUser } from '../../../repos/user'
import FormRegistration from './formRegistration.js';
import IsRegistered from "./isRegistered";

const RegistrationPage = () => {
  let [registrationSuccess, setRegistrationSuccess] = React.useState(null);

  const sendRegistrationForm = (user) => {
    addUser(user).then(response => {
      if (response.status === 200) return setRegistrationSuccess(true);
      if (response.status === 200) return setRegistrationSuccess(true);
      setRegistrationSuccess(false);
    })
      .catch(err => {
        setRegistrationSuccess(false);
      })
  }
  return (
    <div className="registrationPage">
      {registrationSuccess !== true ? <FormRegistration sendRegistrationForm={sendRegistrationForm} /> : <IsRegistered registrationSuccess={registrationSuccess} />}
      {registrationSuccess === false ? <div><p>Nie udało się dokonać rejestracji</p><p>Może już istnieć taka nazwa użytkownika lub e-mail</p></div> : null}
    </div >

  );
};

export default RegistrationPage;
