import React from 'react';
import { coutriesListOptions } from './coutriesListOptions';
import InputCity from './inputCity';
import { Form } from 'semantic-ui-react';
import { ButtonBasic } from "../../../button";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { genderList } from './genderList';
import { getCoords } from '../../../../utils/geoLocation';
const FormRegistration = (props) => {
    const { sendRegistrationForm } = props;
    let [name, setName] = React.useState("");
    let [mail, setMail] = React.useState("");
    let [country, setCountry] = React.useState("Polska");
    let [city, setCity] = React.useState({ value: "", picked: false });
    let [gender, setGender] = React.useState("");
    let [birth, setBirth] = React.useState("");
    let [password, setPassword] = React.useState("");
    let [confirmPassword, setConfirmPassword] = React.useState("");

    let [nameError, setNameError] = React.useState(null);
    let [mailError, setMailError] = React.useState(null);
    let [countryError, setCountryError] = React.useState(false);
    let [cityError, setCityError] = React.useState(null);
    let [genderError, setGenderError] = React.useState(null);
    let [birthError, setBirthError] = React.useState(null);
    let [passwordError, setPasswordError] = React.useState(null);
    let [confirmPasswordError, setConfirmPasswordError] = React.useState(null);
    const errors = [nameError, mailError, countryError, cityError, genderError, birthError, passwordError, confirmPasswordError];

    const validate = {
        name: () => name.length > 2 ? setNameError(false) : setNameError(true),
        mail: () => mail.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) ? setNameError(false) : setMailError(true),
        country: () => country.length > 3 ? setNameError(false) : setCountryError(true),
        city: () => !city.picked ? setCityError(false) : setCityError(true),
        gender: () => gender.length > 2 ? setGenderError(false) : setGenderError(true),
        birth: () => birth.length === 10 ? setBirthError(false) : setBirthError(true),
        password: () => password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/) ? setPasswordError(false) : setPasswordError(true),
        confirmPassword: () => confirmPassword === password ? setConfirmPasswordError(false) : setConfirmPasswordError(true)
    }

    const handleRegistration = async (e) => {
        e.preventDefault();
        for (let error in errors) {
            if (errors[error]) return
        }

        const coords = await getCoords(city);

        const user = { name, mail, country, city: city.value, gender, birth, password, coords };

        sendRegistrationForm(user);
    }


    return (
        <form className="registrationForm" onSubmit={handleRegistration}>
            <InputField setValue={setName} label="Użytkownik" error={nameError} type="text" errorMessage={'min 3 znaki'} validate={validate.name} />
            <InputField setValue={setMail} label="E-mail" type="email" error={mailError} errorMessage={'podaj poprawny adres mailowy'} validate={validate.mail} />
            <SelectField setValue={setCountry} label="Państwo" options={coutriesListOptions()} defaultValue="Polska" error={countryError} errorMessage={'wybierz kraj'} validate={validate.country} />
            <InputCity city={city} setCity={setCity} error={cityError} setError={setCityError} errorMessage={'wybierz misto z podpowiedzi'} validate={validate.city} />
            <SelectField setValue={setGender} label="Płeć" options={genderList} error={genderError} errorMessage={'wybierz płeć'} validate={validate.gender} />
            <InputField setValue={setBirth} label="Data urodzenia" type="date" error={birthError} errorMessage={'podaj poprawną datę urodzenia'} validate={validate.birth} />
            <InputField setValue={setPassword} label="Hasło" type="password" error={passwordError} errorMessage={'Hasło powinno składać się z conajmniej 8 małych i dużych liter oraz cyfr'} validate={validate.password} />
            <InputField setValue={setConfirmPassword} label="Powtórz hasło" type="password" error={confirmPasswordError} errorMessage={'hasła różnią się od siebie'} validate={validate.confirmPassword} />
            <Form.Field className="submitRegistrationBtn">
                <ButtonBasic content={"Zarejestruj"} />
            </Form.Field>
        </form>

    )
}


export default FormRegistration;