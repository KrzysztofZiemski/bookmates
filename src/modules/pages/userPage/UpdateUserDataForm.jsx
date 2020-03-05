import React, { useState } from "react";
import { ButtonBasic } from "../../button";
import { Form, Select, Label, Input, Button } from 'semantic-ui-react';
import { deleteCookie } from "../../cookies/cookies";
import { updateUser, removeUser } from "../../../repos/user";
import { getCoords } from '../../../utils/geoLocation';
import { coutriesListOptions } from '../registrationPage/coutriesListOptions';
import InputCity from '../registrationPage/inputCity';
import ErrorMessage from '../registrationPage/errorMessage';

const IsUpdated = (props) => {
  const { updateSuccess } = props;
  const successful = <div><h2>Twoje dane zostały zaktualizowane</h2></div>;
  const failed = <div><h2>Nie udało się zmienić danych</h2><p>skontaktuj się z administratorem</p></div>;
  if (updateSuccess === false) return failed;
  return successful;
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

const UpdateUserDataForm = (props) => {
  const { loggedUser: { id: id, name: name, country: country, city: oldCity }} = props;

  let [newName, setName] = useState(name);
  let [setCountry] = useState(country);
  let [city, setCity] = useState({ value: oldCity, picked: false });
  let [errorCity, setErrorCity] = useState(null);
  let [ updateSuccess ] = useState(null);

  const validateCity = () => {
    if (city.picked) return setErrorCity(false);
    setErrorCity(true);
  }

  const handleUserDataUpdate = async (e) => {
    e.preventDefault();
    let coords = await getCoords(`${country} ${city.value}`)
      .catch(e => HTMLFormControlsCollection.log('nie udalo sie nanieść zmian'));
    if (!coords) coords = null;
    const newUser = { newName, country, city: city.value, coords };
    console.log(newUser);
    updateUser(id, newUser).then(response => updateSuccess(true)); 
  }

  const deleteAccount = () => {
    removeUser(id).then(response => {
      console.log(response.status);
      if (response.status === 204){
        IsDeleted(true, props);
      } else {
        IsDeleted(false, props);
      } 
    });
  }

  // updateSuccess === true ? <IsUpdated updateSuccess={true} /> : <IsUpdated updateSuccess={false} />

  return (
    <div>
      <Form onSubmit={handleUserDataUpdate}>
        <Form.Field>
          <Label>Użytkownik</Label>
          <Input value={newName} onChange={e => setName(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <Label>Państwo</Label>
          <Select 
            options={coutriesListOptions()} 
            id="registrationCountry" 
            defaultValue="Polska" 
            onChange={(e, data) => setCountry(data.value)} 
          />
        </Form.Field>
        <Form.Field>
          <Label>Miasto</Label>
          <InputCity setErrorCity={setErrorCity} setCity={setCity} city={city} validateCity={validateCity} >
              <ErrorMessage error={errorCity} message={"Wpisz nazwę miejscowości i wybierz jedną z podpowiedzi"} />
          </InputCity>
        </Form.Field>
        <ButtonBasic content="Zatwierdź zmiany" />
      </Form>
      <Button onClick={deleteAccount}>Usuń konto</Button>
    </div>

  );
};

export default UpdateUserDataForm;