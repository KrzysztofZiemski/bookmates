import React from "react";
import "./registrationPage.scss";
import { addUser } from '../../../repos/user'
import FormRegistration from './formRegistration.js';
import IsRegistered from "./isRegistered";

const RegistrationPage = () => {
  let [registrationSuccess, setRegistrationSuccess] = React.useState(null);

  const sendRegistrationForm = (user) => {
    addUser(user).then(response => setRegistrationSuccess(true))
  }
  return (
    <div className="registrationPage">
      {registrationSuccess === null ? <FormRegistration sendRegistrationForm={sendRegistrationForm} /> : <IsRegistered registrationSuccess={registrationSuccess} />}

    </div >

  );
};

export default RegistrationPage;
