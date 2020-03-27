import React, { useState } from "react";
import { changeUserPassword } from "../../../repos/user";
import { ButtonBasic } from "../../Button/Button";
import { InputField } from './../registrationPage/formRegistration/InputField';
import { Form } from 'semantic-ui-react';
import { ErrorMessage } from "./../../ErrorMessage/ErrorMessage";
import { SuccessMessage } from "./../../successMessage/SuccessMessage";

const ChangePasswordForm = (props) => {
  const { loggedUser: { id: id }} = props;
  const successMessage = "Hasło zostało pomyślnie zaktualizowane.";
  const noSuccessMessage = "Nie udało się zmienić hasła. Skontaktuj się z administratorem.";

  let [ updateSuccess, setUpdateSuccess ] = useState(null);
  let [oldPassword, setOldPassword] = useState("")
  let [newPassword, setNewPassword] = useState("");
  let [newPasswordError, setNewPasswordError] = useState(null);
  let [confirmPassword, setConfirmPassword] = useState("");
  let [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const errors = [newPasswordError, confirmPasswordError];

  const validate = {
    newPassword: () => ((newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)) && (newPassword !== oldPassword)) ? setNewPasswordError(false) : setNewPasswordError(true),
    confirmPassword: () => confirmPassword === newPassword ? setConfirmPasswordError(false) : setConfirmPasswordError(true)
  }

  const changePassword = (e) => {
    e.preventDefault();
    for (let fieldValidate in validate) {
      validate[fieldValidate]()
    }
    for (let error in errors) {
        if (errors[error] !== false) return
    }
    let passwords = { oldPassword, newPassword };
    changeUserPassword(id, passwords).then(response => {
      if(response.status === 204){
        setUpdateSuccess(true);
      } else {
        setUpdateSuccess(false);
      }
    });
  }

  const closeError = () => {
    setUpdateSuccess(null);
  }

  return (
    <form onSubmit={changePassword} className="updateUserDataForm">
      <InputField
        setValue={setOldPassword}
        label="Stare hasło"
        type="password" 
        id="password" 
      />
      <InputField
        setValue={setNewPassword}
        label="Nowe hasło"
        type="password" 
        id="registrationPassword"
        error={newPasswordError} 
        errorMessage={'Sprawdź hasło: musi zawierać przynajmniej 8 znaków, małe i duże litery, cyfrę oraz nie może być identyczne jak stare hasło.'} 
        validate={validate.newPassword}
      />
      <InputField 
        setValue={setConfirmPassword}
        label="Powtórz nowe hasło"
        type="password" 
        id="registrationPasswordConfirm" 
        error={confirmPasswordError} 
        errorMessage={'Hasła różnią się od siebie.'}
        validate={validate.confirmPassword}
      />
      <Form.Field className="submitUserDataUpdateBtn">
        <ButtonBasic 
          content="Zatwierdź nowe hasło" 
        />
        { updateSuccess === true ? <SuccessMessage message={successMessage} closeError={closeError} /> : ''}
        { updateSuccess === false ? <ErrorMessage message={noSuccessMessage} closeError={closeError} /> : ''}
      </Form.Field>
    </form>
  );
};

export default ChangePasswordForm;