import React from "react";
import "./style.css";
import { getCoords } from '../../../utils/geoLocation'
import { addUser } from '../../../repos/user'

const RegistrationPage = () => {

  let [name, setName] = React.useState(undefined);
  let [surName, setSurName] = React.useState(undefined);
  let [mail, setMail] = React.useState(undefined);
  let [country, setCountry] = React.useState(undefined);
  let [city, setCity] = React.useState(undefined);
  let [street, setStreet] = React.useState(undefined);
  let [streetNumber, setStreetNumber] = React.useState(undefined);
  let [localNumber, setLocalNumber] = React.useState(undefined);
  let [postalCode, setPostalCode] = React.useState(undefined);
  let [region, setRegion] = React.useState(undefined);
  let [gender, setGender] = React.useState(undefined);
  let [birth, setBirth] = React.useState(undefined);
  let [password, setPassword] = React.useState(undefined);
  let [confirmPassword, setConfirmPassword] = React.useState(undefined);


  const handleRegistration = async (e) => {
    e.preventDefault();
    if (name && surName && mail && country && city && street && streetNumber && postalCode && region && gender && birth && password && confirmPassword) {
      if (password !== confirmPassword) return console.log('hasło nie jest zgodne');
      const coords = await getCoords(`${city} ${street} ${streetNumber}`);
      const user = { name, surName, mail, country, city, street, streetNumber, localNumber, postalCode, region, gender, birth, password, coords }
      addUser(user)
    } else {
      console.log('nie wypełnione pole')
    }
  }

  return (
    <div>
      <form className="registrationForm" onSubmit={handleRegistration}>
        <div>
          <label htmlFor="registrationName">Imię: </label><input type="text" id="registrationName" onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="registrationSurname">Nazwisko: </label><input type="text" id="registrationSurname" onChange={(e) => setSurName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="registrationMail">E-mail: </label><input type="text" id="registrationMail" onChange={(e) => setMail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="registrationCountry">Państwo: </label><input type="text" id="registrationCountry" onChange={(e) => setCountry(e.target.value)} />
        </div>
        <div>
          <label htmlFor="registrationCity">Miasto: </label><input type="text" id="registrationCity" onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <label htmlFor="registrationStreet">Ulica: </label><input type="text" id="registrationStreet" onChange={(e) => setStreet(e.target.value)} />
        </div>
        <div>
          <label htmlFor="registrationStreetNumber">Numer domu: </label><input type="text" id="registrationStreetNumber" onChange={(e) => setStreetNumber(e.target.value)} />
        </div>
        <div>
          <label htmlFor="registrationLocalNumber">Mieszkanie: </label><input type="text" id="registrationLocalNumber" onChange={(e) => setLocalNumber(e.target.value)} />
        </div>
        <div>
          <label htmlFor="registrationPostalCode">Kod Pocztowy: </label><input type="text" id="registrationPostalCode" onChange={(e) => setPostalCode(e.target.value)} />
        </div>
        <div>
          <label htmlFor="registrationRegion">Region: </label><input type="text" id="registrationRegion" onChange={(e) => setRegion(e.target.value)} />
        </div>
        <div>
          <label htmlFor="registrationGender">Płeć</label>
          <select id="registrationGender" onChange={(e) => setGender(e.target.value)}>
            <option value={null}></option>
            <option value="man">Mężczyzna</option>
            <option value="woman">Kobieta</option>
            <option value="other">Inne</option>
          </select>
        </div>
        <div>
          <label htmlFor="registrationBirth">Rok urodzenia: </label><input type="text" id="registrationBirth" onChange={(e) => setBirth(e.target.value)} />
        </div>
        <div>
          <label htmlFor="registrationPassword">Hasło: </label><input type="text" id="registrationPassword" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor="registrationPasswordConfirm">Powtórz hasło </label><input type="text" id="registrationPasswordConfirm" onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit">Zarejestruj</button>
      </form>
    </div >

  );
};

export default RegistrationPage;
