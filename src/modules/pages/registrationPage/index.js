import React from "react";
import "./style.css";
import { addUser } from '../../../repos/user'
import FormRegistration from './formRegistration.js';
import { Link } from "react-router-dom";

const RegistrationPage = () => {
  let [registrationSucces, setRegistrationSucces] = React.useState();

  const sendRegistrationForm = (user) => {
    addUser(user).then(response => setRegistrationSucces(true))
  }

  return (
    <div>
      {registrationSucces ? <div><h2>Dziekujemy za dokonanie rejestracji</h2> <Link to={"/"}> Przejdź do strony logowania</Link></div> : <FormRegistration sendRegistrationForm={sendRegistrationForm} />}

    </div >

  );
};

export default RegistrationPage;
