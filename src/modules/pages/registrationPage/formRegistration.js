import React from 'react';
import { getCoords } from '../../../utils/geoLocation';
import { coutriesListOptions } from './coutriesListOptions';
import InputCity from './inputCity';
import ErrorMessage from './errorMessage';
import { Form, Input, Label, Select } from 'semantic-ui-react';
import { ButtonBasic } from "../../button";

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

    let [errorName, setErrorName] = React.useState(null);
    let [errorMail, setErrorMail] = React.useState(null);
    let [errorCountry, setErrorCountry] = React.useState(null);
    let [errorCity, setErrorCity] = React.useState(null);
    let [errorGender, setErrorGender] = React.useState(null);
    let [errorBirth, setErrorBirth] = React.useState(null);
    let [errorPassword, setErrorPassword] = React.useState(null);
    let [errorConfirmPassword, setErrorConfirmPassword] = React.useState(null);
    const validateName = () => {
        if (name.length < 3) return setErrorName(true)
        setErrorName(false)
    }

    const validateEmail = () => {
        if (!mail.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) return setErrorMail(true);
        setErrorMail(false)
    }
    const validateCountry = () => {
        if (country.length < 2) return setErrorCountry(true);
        setErrorCountry(false)
    }
    const validateCity = () => {
        if (city.picked) return setErrorCity(false);
        setErrorCity(true)
    }
    const validateGender = () => {
        if (gender.length < 2) return setErrorGender(true);
        setErrorGender(false)
    }

    const validateBirth = () => {
        if (!birth) return setErrorBirth(true);
        setErrorBirth(false)
    }
    const validatePassword = () => {
        var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        if (!password.match(regex)) return setErrorPassword(true);
        setErrorPassword(false)
    }
    const validateConfirmPassword = () => {
        if (confirmPassword !== password) return setErrorConfirmPassword(true);
        setErrorConfirmPassword(false)
    }

    const handleRegistration = async (e) => {
        e.preventDefault();
        //tutaj validacja i wyswietlenie komunikatu
        let coords = await getCoords(`${country} ${city.value}`).catch(e => HTMLFormControlsCollection.log('nie udalo sie zarejestrować'));//message
        if (!coords) coords = null;

        const user = { name, mail, country, city: city.value, gender, birth, password, coords };

        sendRegistrationForm(user)

    }
    const optionsGender = [
        {
            key: "",
            value: "",
            text: ""
        },
        {
            key: "man",
            value: "man",
            text: "mężczyzna"
        },
        {
            key: "woman",
            value: "woman",
            text: "kobieta"
        },
        {
            key: "other",
            value: "other",
            text: "inny"
        },
    ]

    return (

        <form className="registrationForm" onSubmit={handleRegistration}>
            <Form.Field className={errorName ? 'errorElementRegistration' : null}>
                <Label htmlFor="registrationName">Użytkownik: </Label>
                <Input type="text" id="registrationName" onBlur={validateName} onChange={(e, data) => setName(data.value)} />
                <ErrorMessage error={errorName} message={"nazwa użytkownika powinna mieć conajmniej 3 znaki"} />
            </Form.Field>
            <Form.Field className={errorMail ? 'errorElementRegistration' : null}>
                <Label htmlFor="registrationMail">E-mail: </Label>
                <Input type="email" id="registrationMail" onChange={(e, data) => setMail(data.value)} onBlur={validateEmail} />
                <ErrorMessage error={errorMail} message={"Podaj poprawny adres mailowy"} />
            </Form.Field>
            <Form.Field className={errorCountry ? 'errorElementRegistration' : null}>
                <Label htmlFor="registrationCountry">Państwo: </Label>
                <Select options={coutriesListOptions()} id="registrationCountry" defaultValue="Polska" onChange={(e, data) => setCountry(data.value)} onBlur={validateCountry} />
                <ErrorMessage error={errorCountry} message={"wybierz Państwo"} />
            </Form.Field>
            <Form.Field className={errorCity ? 'errorElementRegistration' : null}>
                <InputCity setErrorCity={setErrorCity} setCity={setCity} city={city} validateCity={validateCity} >
                    <ErrorMessage error={errorCity} message={"Wpisz nazwę miejscowości i wybierz jedną z podpowiedzi"} />
                </InputCity>
            </Form.Field>
            <Form.Field className={errorGender ? 'errorElementRegistration' : null}>
                <Label htmlFor="registrationGender">Płeć</Label>
                <Select options={optionsGender} id="registrationGender" onBlur={validateGender} onChange={(e, data) => setGender(data.value)} />
                <ErrorMessage error={errorGender} message={'Wybierz płeć. Jeśli nie chcesz podawać tej informacji wybierz obcję "Inne"'} />
            </Form.Field>
            <Form.Field className={errorBirth ? 'errorElementRegistration' : null}>
                <Label htmlFor="registrationBirth">Rok urodzenia: </Label>
                <Input type="date" min="1900" placeholder="YYYY" id="registrationBirth" onBlur={validateBirth} onChange={(e, data) => setBirth(data.value)} />
                <ErrorMessage error={errorBirth} message={'Podaj poprawny rok urodzenia'} />
            </Form.Field>
            <Form.Field className={errorPassword ? 'errorElementRegistration' : null}>
                <Label htmlFor="registrationPassword">Hasło: </Label>
                <Input pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" type="password" id="registrationPassword" onBlur={validatePassword} onChange={(e, data) => setPassword(data.value)} />
                <ErrorMessage error={errorPassword} message={'Hasło musi zawierać przynajmniej 8 znaków. Muszą się w nim znaleźć małe i duże litery oraz cyfra'} />
            </Form.Field>
            <Form.Field className={errorConfirmPassword ? 'errorElementRegistration' : null}>
                <Label htmlFor="registrationPasswordConfirm">Powtórz hasło </Label>
                <Input type="password" id="registrationPasswordConfirm" onBlur={validateConfirmPassword} onChange={(e, data) => setConfirmPassword(data.value)} />
                <ErrorMessage error={errorConfirmPassword} message={'Hasła różnią się od siebie'} />
            </Form.Field>
            <Form.Field>
                <ButtonBasic content={"Zarejestruj"} />
            </Form.Field>
        </form>


    )
}


export default FormRegistration;