import React, { useState } from "react";
import { ButtonBasic } from "../../Button/Button";
import { Form, Select, Label, Input, Button } from 'semantic-ui-react';
import { deleteCookie } from "../../cookies/cookies";
import { updateUser, removeUser } from "../../../repos/user";
import { getCoords } from '../../../utils/geoLocation';
import { getCountries} from '../registrationPage/formRegistration/coutriesList';
import InputCity from '../registrationPage/formRegistration/inputCity';

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

const UpdateUserDataForm = (props) => {
  const { loggedUser: { id: id, name: name, country: country, city: oldCity }} = props;

  let [ newName, setName ] = useState(name);
  let [ newCountry, setCountry ] = useState(country);
  let [ city, setCity ] = useState({ value: oldCity, picked: false });
  let [ errorCity, setErrorCity ] = useState(null);

  const validateCity = () => {
    if (city.picked) return setErrorCity(false);
    setErrorCity(true);
  }

  const handleUserDataUpdate = async (e) => {
    e.preventDefault();
    let coords = await getCoords(`${country} ${city.value}`)
      .catch(e => HTMLFormControlsCollection.log('nie udalo sie nanieść zmian'));
    if (!coords) coords = null;
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
            options={getCountries()} 
            id="registrationCountry" 
            defaultValue= {country}
            onChange={(e, data) => setCountry(data.value)} 
          />
        </Form.Field>
        <Form.Field>
          <InputCity 
            city={city} 
            setCity={setCity} 
            error={errorCity} 
            setError={setErrorCity} 
            message={"Wpisz nazwę miejscowości i wybierz jedną z podpowiedzi"} 
            validateCity={validateCity} >
          </InputCity>
        </Form.Field>
        <ButtonBasic content="Zatwierdź zmiany" />
      </Form>
      <Button onClick={deleteAccount}>Usuń konto</Button>
    </div>
  );
};

export default UpdateUserDataForm;