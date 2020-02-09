import React from "react";
import "./registrationPage.scss";
import { addUser } from '../../../repos/user'
import FormRegistration from './formRegistration.js';
import IsRejestration from "./isRejestration";

const RegistrationPage = () => {
  let [registrationSucces, setRegistrationSucces] = React.useState(null);

  const sendRegistrationForm = (user) => {
    addUser(user).then(response => setRegistrationSucces(true))
  }
  return (
    <div>
      {registrationSucces === null ? <FormRegistration sendRegistrationForm={sendRegistrationForm} /> : <IsRejestration registrationSucces={registrationSucces} />}

    </div >

  );
};

export default RegistrationPage;
