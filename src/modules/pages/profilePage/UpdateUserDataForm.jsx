import React, { useState } from "react";
import { ButtonBasic } from "../../Button/Button";
import { Form, Button } from 'semantic-ui-react';
import { InputName } from './InputName.jsx';
import { SelectField } from './../registrationPage/formRegistration/SelectField';
import { deleteCookie } from "../../cookies/cookies";
import { updateUser, removeUser } from "../../../repos/user";
import { getCoords } from '../../../utils/geoLocation';
import { getCountries} from '../registrationPage/formRegistration/coutriesList';
import InputCity from '../registrationPage/formRegistration/inputCity';

const UpdateUserDataForm = (props) => {
  const { loggedUser: { id: id, name: name, country: country, city: oldCity }} = props;

  let [ newName, setName ] = useState(name);
  let [ nameError, setNameError ] = useState(null); 
  let [ newCountry, setCountry ] = useState(country);
  let [ countryError, setCountryError ] = useState(null);
  let [ city, setCity ] = useState({ value: oldCity, picked: false });
  let [ cityError, setCityError ] = useState(null);

  const errors = [ nameError, countryError, cityError ];

  const validate = {
    name: () => newName.length > 2 ? setNameError(false) : setNameError(true),
    country: () => newCountry.length > 3 ? setCountryError(false) : setCountryError(true),
    city: () => city.picked ? setCityError(false) : setCityError(true)
  }

  const IsUpdated = (result) => {
      if (result === false){
        alert("Nie udało się zaktualizować danych. Skontaktuj się z administratorem.");
      } else {
        alert("Dane zostały pomyślnie zaktualizowane.");
      }
  }

  const IsDeleted = (result, props) => {
    const { setLoginUser } = props;
    if(result === false){
      alert("Nie udało się usunąć konta. Skontaktuj się z administratorem");
    } else {
      deleteCookie("accessToken");
      setLoginUser(null);
      alert("Konto usunięte");
    }
  }

  const handleUserDataUpdate = async (e) => {
    e.preventDefault();
    for (let fieldValidate in validate) {
      validate[fieldValidate]()
    }
    for (let error in errors) {
        if (errors[error] !== false) return
    }
    const coords = await getCoords(city);
    const newUser = { name: newName, country: newCountry, city: city.value, coords };
    updateUser(id, newUser).then(response => {
      if(response.status === 204){
        IsUpdated(true);
      } else {
        IsUpdated(false);
      }
    }); 
  }

  const deleteAccount = () => {
    const confirmation = window.confirm("Czy jesteś pewien, że chcesz usunąć konto?");
    if(confirmation === true){
      removeUser(id).then(response => {
        console.log(response.status);
        if (response.status === 204){
          IsDeleted(true, props);
        } else {
          IsDeleted(false, props);
        } 
      });
    }
  }

  return (
    <>
      <form onSubmit={handleUserDataUpdate} className="updateUserDataForm">
        <InputName
          label="Użytkownik"
          value={newName}
          type="text"
          setValue={setName}
          validate={validate.name}
          error={nameError}
          errorMessage={"Nazwa użytkownika powinna posiadać minimum 3 znaki."} 
        />
        <SelectField
          label="Państwo"
          options={getCountries()} 
          id="registrationCountry" 
          defaultValue= {country}
          setValue={setCountry}
          error={countryError}
          errorMessage={"Wybierz kraj."}
          validate={validate.country}
        />
        <InputCity 
          city={city} 
          setCity={setCity} 
          error={cityError} 
          setError={setCityError} 
          message={"Wybierz miasto z podpowiedzi"} 
          validate={validate.city}
        />
        <Form.Field className="submitUserDataUpdateBtn">
          <ButtonBasic content="Zatwierdź zmiany" />
        </Form.Field>
      </form>
      <Button className="deleteAccountBtn" onClick={deleteAccount}>Usuń konto</Button>
    </>
  );
};

export default UpdateUserDataForm;