import React, { useState } from "react";
import { ButtonBasic } from "./../../Button/Button";
import { Form, Label, Input } from 'semantic-ui-react';
import ErrorMessage from './../registrationPage/formRegistration/errorMessage';

const ChangePasswordForm = (props) => {
  const { loggedUser: { mail: mail }} = props;

  let [oldPassword, setOldPassword] = useState("")
  let [newPassword, setNewPassword] = useState("");
  let [errorNewPassword, setErrorNewPassword] = useState(null);
  let [confirmPassword, setConfirmPassword] = useState("");
  let [errorConfirmPassword, setErrorConfirmPassword] = useState(null);

  const validateNewPassword = () => {
    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (!newPassword.match(regex)) return setErrorNewPassword(true);
    setErrorNewPassword(false);
  }
  const validateConfirmPassword = () => {
    if (confirmPassword !== newPassword) return setErrorConfirmPassword(true);
    setErrorConfirmPassword(false);
  }

  const handleUserDataUpdate = async (e) => {
    e.preventDefault();
    console.log();
  }

  const changePassword = () => {
    
  }


  return (
    <Form onSubmit={handleUserDataUpdate}>
      <Form.Field>
        <Label>Wpisz stare hasło</Label>
        <Input
          type="password" 
          id="password" 
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </Form.Field>
      <Form.Field className={errorNewPassword ? 'errorElementRegistration' : null}>
        <Label htmlFor="registrationPassword">Wpisz nowe hasło</Label>
        <Input 
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" 
          type="password" 
          id="registrationPassword" 
          onBlur={validateNewPassword} 
          onChange={(e, data) => setNewPassword(data.value)} 
        />
        <ErrorMessage 
          error={errorNewPassword} 
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