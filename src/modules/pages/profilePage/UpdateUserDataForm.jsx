import React, { useState } from "react";
import { ButtonBasic } from "../../Button/Button";
import { Form, Button } from "semantic-ui-react";
import { InputName } from "./InputName.jsx";
import { SelectField } from "./../registrationPage/formRegistration/SelectField";
import { deleteCookie } from "../../cookies/cookies";
import { updateUser, removeUser, getAllUsers } from "../../../repos/user";
import { getCoords } from "../../../utils/geoLocation";
import { getCountries } from "../registrationPage/formRegistration/coutriesList";
import InputCity from "../registrationPage/formRegistration/inputCity";
import { ErrorMessage } from "./../../ErrorMessage/ErrorMessage";
import { SuccessMessage } from "./../../successMessage/SuccessMessage";

const UpdateUserDataForm = (props) => {
  const {
    loggedUser: { id: id, name: name, country: country, city: oldCity },
  } = props;
  const successMessage = "Dane zostały pomyślnie zaktualizowane.";
  const noSuccessMessage =
    "Nie udało się zaktualizować danych. Skontaktuj się z administratorem.";

  let [updateSuccess, setUpdateSuccess] = useState(null);
  let [newName, setName] = useState(name);
  let [nameError, setNameError] = useState(null);
  let [newCountry, setCountry] = useState(country);
  let [countryError, setCountryError] = useState(null);
  let [city, setCity] = useState({ value: oldCity, picked: true });
  let [cityError, setCityError] = useState(null);

  const errors = [nameError, countryError, cityError];

  const validate = {
    name: () => validateName(newName),
    country: () =>
      newCountry.length > 3 ? setCountryError(false) : setCountryError(true),
    city: () => (city.picked ? setCityError(false) : setCityError(true)),
  };

  const validateName = (newName) => {
    return getAllUsers().then((response) => {
      return response.json().then((allUsers) => {
        if (newName === name) {
          setNameError(false);
          return;
        }
        if (newName.length < 3) {
          setNameError(true);
          return;
        }
        if (allUsers.find((n) => n.name === newName)) {
          setNameError(true);
          return;
        }
        setNameError(false);
      });
    });
  };

  const IsDeleted = (result, props) => {
    const { setLoginUser } = props;
    if (result === false) {
      alert("Nie udało się usunąć konta. Skontaktuj się z administratorem.");
    } else {
      deleteCookie("accessToken");
      setLoginUser(null);
      alert("Konto usunięte.");
    }
  };

  const handleUserDataUpdate = async (e) => {
    e.preventDefault();
    for (let fieldValidate in validate) {
      validate[fieldValidate]();
    }
    for (let error in errors) {
      if (errors[error]) {
        return;
      }
    }
    const coords = await getCoords(city);
    const newUser = {
      name: newName,
      country: newCountry,
      city: city.value,
      coords,
    };
    updateUser(id, newUser).then((response) => {
      if (response.status === 204) {
        setUpdateSuccess(true);
      } else {
        setUpdateSuccess(false);
      }
    });
  };

  const deleteAccount = () => {
    const confirmation = window.confirm(
      "Czy jesteś pewien, że chcesz usunąć konto?"
    );
    if (confirmation === true) {
      removeUser(id).then((response) => {
        if (response.status === 204) {
          IsDeleted(true, props);
        } else {
          IsDeleted(false, props);
        }
      });
    }
  };

  const closeError = () => {
    setUpdateSuccess(null);
  };

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
          errorMessage={
            "Nazwa użytkownika powinna posiadać minimum 3 znaki i być unikalna."
          }
        />
        <SelectField
          label="Państwo"
          options={getCountries()}
          id="registrationCountry"
          defaultValue={country}
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
          {updateSuccess === true ? (
            <SuccessMessage message={successMessage} closeError={closeError} />
          ) : (
            ""
          )}
          {updateSuccess === false ? (
            <ErrorMessage message={noSuccessMessage} closeError={closeError} />
          ) : (
            ""
          )}
        </Form.Field>
      </form>
      <Button className="deleteAccountBtn" onClick={deleteAccount}>
        Usuń konto
      </Button>
    </>
  );
};

export default UpdateUserDataForm;
