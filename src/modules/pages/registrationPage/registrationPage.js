import React from "react";
import "./registrationPage.scss";
import { addUser } from '../../../repos/user';
import FormRegistration from './formRegistration/formRegistration';
import { Loader } from '../../Loader/Loader';
import { ErrorMessage } from '../../ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../../successMessage/SuccessMessage';
const RegistrationPage = () => {
  let [registrationSuccess, setRegistrationSuccess] = React.useState(null);
  let [waiting, setWaiting] = React.useState(false);

  const errorMessage = 'moze już istnieć użytkownik o podanej nazwie lub e-mailu';

  const sendRegistrationForm = (user) => {
    setWaiting(true);
    addUser(user).then(response => {
      setWaiting(false);
      if (response.status === 200) return setRegistrationSuccess(true);
      setRegistrationSuccess(false);
    })
      .catch(err => {
        setWaiting(false);
        setRegistrationSuccess(false);
      })
  }

  const closeError = () => {
    setRegistrationSuccess(null);
  }

  return (
    <div className="registrationPage">
      {registrationSuccess ? <SuccessMessage closeError={closeError} /> : null}
      {!registrationSuccess ? <FormRegistration sendRegistrationForm={sendRegistrationForm} registrationSuccess={registrationSuccess} /> : null}
      {registrationSuccess === false ? <ErrorMessage message={errorMessage} closeError={closeError} /> : null}
      {waiting ? <Loader /> : null}
    </div >

  );
};

export default RegistrationPage;
