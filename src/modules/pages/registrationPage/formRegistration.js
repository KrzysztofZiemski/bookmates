import React from 'react';
import { getCoords } from '../../../utils/geoLocation';
import { CoutriesListOptions } from './coutriesListOptions';
import InputCity from './inputCity';
import ErrorMessage from './errorMessage';

const FormRegistration = (props) => {
    const { sendRegistrationForm } = props;
    let [name, setName] = React.useState("");
    let [mail, setMail] = React.useState("");
    let [country, setCountry] = React.useState("POLSKA");
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
        console.log('walidate', city)
        if (city.picked) return setErrorCity(false);
        setErrorCity(true)
    }
    const validateGender = () => {
        if (gender.length < 2) return setErrorGender(true);
        setErrorGender(false)
    }

    const validateBirth = () => {
        if (Number(birth) < 1900 || Number(birth) > new Date().getFullYear()) return setErrorBirth(true);
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
        console.log(coords)
        if (!coords) coords = null;

        const user = { name, mail, country, city: city.value, gender, birth, password, coords }

        sendRegistrationForm(user)

    }

    return (

        <form className="registrationForm" onSubmit={handleRegistration}>
            <div className={errorName ? 'errorElementRegistration' : null}>
                <label htmlFor="registrationName">Użytkownik: </label>
                <input type="text" id="registrationName" onBlur={validateName} onChange={(e) => setName(e.target.value)} />
                <ErrorMessage error={errorName} message={"nazwa użytkownika powinna mieć conajmniej 3 znaki"} />
            </div>
            <div className={errorMail ? 'errorElementRegistration' : null}>
                <label htmlFor="registrationMail">E-mail: </label>
                <input type="email" id="registrationMail" onChange={(e) => setMail(e.target.value)} onBlur={validateEmail} />
                <ErrorMessage error={errorMail} message={"Podaj poprawny adres mailowy"} />
            </div>
            <div className={errorCountry ? 'errorElementRegistration' : null}>
                <label htmlFor="registrationCountry">Państwo: </label>
                <select id="registrationCountry" defaultValue="Polska" onChange={(e) => setCountry(e.target.value)} onBlur={validateCountry}>
                    <CoutriesListOptions />
                </select>
                <ErrorMessage error={errorCountry} message={"wybierz Państwo"} />
            </div>
            <div className={errorCity ? 'errorElementRegistration' : null}>
                <InputCity setErrorCity={setErrorCity} setCity={setCity} city={city} validateCity={validateCity} >
                    <ErrorMessage error={errorCity} message={"Wpisz nazwę miejscowości i wybierz jedną z podpowiedzi"} />
                </InputCity>
            </div>
            <div className={errorGender ? 'errorElementRegistration' : null}>
                <label htmlFor="registrationGender">Płeć</label>
                <select id="registrationGender" onBlur={validateGender} onChange={(e) => setGender(e.target.value)}>
                    <option value={null}></option>
                    <option value="man">Mężczyzna</option>
                    <option value="woman">Kobieta</option>
                    <option value="other">Inne</option>
                </select>
                <ErrorMessage error={errorGender} message={'Wybierz płeć. Jeśli nie chcesz podawać tej informacji wybierz obcję "Inne"'} />
            </div>
            <div className={errorBirth ? 'errorElementRegistration' : null}>
                <label htmlFor="registrationBirth">Rok urodzenia: </label>
                <input type="number" min="1900" placeholder="YYYY" id="registrationBirth" onBlur={validateBirth} onChange={(e) => setBirth(e.target.value)} />
                <ErrorMessage error={errorBirth} message={'Podaj poprawny rok urodzenia'} />
            </div>
            <div className={errorPassword ? 'errorElementRegistration' : null}>
                <label htmlFor="registrationPassword">Hasło: </label>
                <input pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" type="password" id="registrationPassword" onBlur={validatePassword} onChange={(e) => setPassword(e.target.value)} />
                <ErrorMessage error={errorPassword} message={'Hasło musi zawierać przynajmniej 8 znaków. Muszą się w nim znaleźć małe i duże litery oraz cyfra'} />
            </div>
            <div className={errorConfirmPassword ? 'errorElementRegistration' : null}>
                <label htmlFor="registrationPasswordConfirm">Powtórz hasło </label><input type="password" id="registrationPasswordConfirm" onBlur={validateConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <ErrorMessage error={errorConfirmPassword} message={'Hasła różnią się od siebie'} />
            </div>
            <button type="submit">Zarejestruj</button>
        </form>


    )
}


export default FormRegistration;