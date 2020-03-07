import React from "react";
import "./registrationPage.scss";
import { addUser } from '../../../repos/user'
import FormRegistration from './formRegistration/formRegistration';

const RegistrationPage = () => {
  let [registrationSuccess, setRegistrationSuccess] = React.useState(null);

  const sendRegistrationForm = (user) => {
    addUser(user).then(response => {
      if (response.status === 200) return setRegistrationSuccess(true);
      setRegistrationSuccess(false);
    })
      .catch(err => {
        setRegistrationSuccess(false);
      })
  }
  return (
    <div className="registrationPage">
      <FormRegistration sendRegistrationForm={sendRegistrationForm} />
      {registrationSuccess === false ? <div><p>Nie udało się dokonać rejestracji</p><p>Może już istnieć taka nazwa użytkownika lub e-mail</p></div> : null}
    </div >

  );
};

export default RegistrationPage;
