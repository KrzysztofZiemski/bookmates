import React from 'react';
import { coutriesListOptions } from './coutriesListOptions';
import InputCity from './registrationField/inputCity';
import { Form } from 'semantic-ui-react';
import { ButtonBasic } from "../../button";
import { InputField } from "./registrationField/InputField";
import { SelectField } from "./registrationField/SelectField";
import { genderList } from './genderList';
import { getCoords } from '../../../utils/geoLocation'
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

    const errorNameCondition = {
        message: "nazwa użytkownika powinna mieć conajmniej 3 znaki",
        length: 3,
    }
    const errorMailCondition = {
        message: "Podaj poprawny adres mailowy",
        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    }
    const errorPasswordCondition = {
        message: "Hasło musi się składać z małych i dużych liter oraz cyfr",
        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/
    }
    const errorConfirmPasswordCondition = {
        message: "Podane hasła nie są takie same",
        isTrue: password === confirmPassword
    }
    const errorBirthCondition = {
        message: "Podaj datę urodzenia",
        length: 9
    }
    const errorGenderCondition = {
        message: "Wybierz płeć",
        condition: {}
    }
    const errorCountryCondition = {
        message: "Wybierz Państwo zamieszkania",
        condition: {}
    }

    const handleRegistration = async (e) => {
        e.preventDefault();
        let coords = await getCoords(`${country} ${city.value}`).catch(e => console.log('nie udalo sie nie udało się pobrać lokalizacji'));
        if (!coords) coords = null;

        const user = { name, mail, country, city: city.value, gender, birth, password, coords };

        sendRegistrationForm(user);
    }

    return (
        <form className="registrationForm" onSubmit={handleRegistration}>
            <InputField value={name} setValue={setName} label="Użytkownik" condition={errorNameCondition} type="text" />
            <InputField value={mail} setValue={setMail} label="E-mail" condition={errorMailCondition} type="email" />
            <SelectField value={country} setValue={setCountry} label="Państwo" condition={errorCountryCondition} options={coutriesListOptions()} defaultValue="Polska" />
            <InputCity city={city} setCity={setCity} />
            <SelectField value={gender} setValue={setGender} label="Płeć" condition={errorGenderCondition} options={genderList} />
            <InputField value={birth} setValue={setBirth} label="Data urodzenia" condition={errorBirthCondition} type="date" />
            <InputField value={password} setValue={setPassword} label="Hasło" condition={errorPasswordCondition} type="password" />
            <InputField value={confirmPassword} setValue={setConfirmPassword} label="Powtórz hasło" condition={errorConfirmPasswordCondition} type="password" />
            <Form.Field className="submitRegistrationBtn">
                <ButtonBasic content={"Zarejestruj"} />
            </Form.Field>
        </form>

    )
}


export default FormRegistration;