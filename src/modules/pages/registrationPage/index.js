import React from "react";
import "./style.css";
import { addUser } from '../../../repos/user'
import FormRegistration from './formRegistration.js';
const RegistrationPage = () => {

  const sendRegistrationForm = (user) => {
    addUser(user).then(response => console.log('response.status'))
  }

  return (
    <div>
      <FormRegistration sendRegistrationForm={sendRegistrationForm} />
    </div >

  );
};

export default RegistrationPage;
