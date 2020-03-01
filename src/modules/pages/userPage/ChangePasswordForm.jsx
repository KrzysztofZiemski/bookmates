import React, { useState } from "react";
import { ButtonBasic } from "../../button";
import { Form, Label, Input } from 'semantic-ui-react';
import ErrorMessage from '../registrationPage/errorMessage';

const ChangePasswordForm = (props) => {
  //const { loggedUser: { id: id, name: name, country: country, city: oldCity }} = props;

  let [password, setPassword] = useState("");
  let [errorPassword, setErrorPassword] = useState(null);
  let [confirmPassword, setConfirmPassword] = useState("");
  let [errorConfirmPassword, setErrorConfirmPassword] = useState(null);

  const validatePassword = () => {
    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (!password.match(regex)) return setErrorPassword(true);
    setErrorPassword(false);
  }
  const validateConfirmPassword = () => {
    if (confirmPassword !== password) return setErrorConfirmPassword(true);
    setErrorConfirmPassword(false);
  }

  const handleUserDataUpdate = async (e) => {
    e.preventDefault();
    console.log();
  }

  const changePassword = () => {
    
  }

  // stare hasło

  return (
      <Form onSubmit={handleUserDataUpdate}>
        <Form.Field className={errorPassword ? 'errorElementRegistration' : null}>
            <Label htmlFor="registrationPassword">Zmień hasło</Label>
            <Input 
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" 
              type="password" 
              id="registrationPassword" 
              onBlur={validatePassword} 
              onChange={(e, data) => setPassword(data.value)} 
            />
            <ErrorMessage 
              error={errorPassword} 
              message={'Hasło musi zawierać przynajmniej 8 znaków. Muszą się w nim znaleźć małe i duże litery oraz cyfra'} 
            />
        </Form.Field>
        <Form.Field className={errorConfirmPassword ? 'errorElementRegistration' : null}>
            <Label htmlFor="registrationPasswordConfirm">Powtórz nowe hasło</Label>
            <Input 
              type="password" 
              id="registrationPasswordConfirm" 
              onBlur={validateConfirmPassword} 
              onChange={(e, data) => setConfirmPassword(data.value)}
            />
            <ErrorMessage error={errorConfirmPassword} message={'Hasła różnią się od siebie'} />
        </Form.Field>
        <ButtonBasic content="Zatwierdź nowe hasło" />
      </Form>
  );
};

export default ChangePasswordForm;