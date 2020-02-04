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
    let [errors, showErrors] = React.useState({ name: false, mail: false, country: false, city: false, gender: false, birth: false, password: false, confirmPassword: false })
    // .then(response => json(response)).then(data => console.log(data))
    //     .catch(err => console.log('error', err))


    const handleRegistration = async (e) => {
        e.preventDefault();

        const errorState = Object.assign({}, errors);
        let isOk = true;

        if (name.length < 3) errorState.name = true;
        if (!mail.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) errorState.mail = true;
        if (country.length < 2) errorState.country = true;
        if (!city.picked || city.value < 2) errorState.city = true;
        if (gender.length < 2) errorState.gender = true;
        if (Number(birth) < 1900 || Number(birth) > new Date().getFullYear()) errorState.birth = true;
        if (!password.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) errorState.password = true;
        if (confirmPassword !== password) errorState.confirmPassword = true;
        for (let variable in errorState) {
            if (variable === true) {
                isOk = false;
                break;
            }
        }
        if (isOk) return showErrors(errorState)

        const coordFromGoogle = await getCoords(`${country} ${city}`).catch(e => console.log(e));
        const coords = coordFromGoogle === undefined || !city ? "" : coordFromGoogle;

        const user = { name, mail, country, city: city.value, gender, birth, password, coords }

        sendRegistrationForm(user)

    }
    return (

        <form className="registrationForm" onSubmit={handleRegistration}>
            <div className={errors.name ? 'errorElementRegistration' : null}>
                <label htmlFor="registrationName">Użytkownik: </label><input type="text" id="registrationName" onChange={(e) => setName(e.target.value)} />
                <ErrorMessage error={errors.name} message={"nazwa użytkownika powinna mieć conajmniej 3 znaki"} />
            </div>
            <div className={errors.mail ? 'errorElementRegistration' : null}>
                <label htmlFor="registrationMail">E-mail: </label><input type="email" id="registrationMail" onChange={(e) => setMail(e.target.value)} />
                <ErrorMessage error={errors.mail} message={"Podaj poprawny adres mailowy"} />
            </div>
            <div className={errors.country ? 'errorElementRegistration' : null}>
                <label htmlFor="registrationCountry">Państwo: </label>
                <select id="registrationCountry" defaultValue="Polska" onChange={(e) => setCountry(e.target.value)}>
                    <CoutriesListOptions />
                </select>
                <ErrorMessage error={errors.country} message={"wybierz Państwo"} />
            </div>
            <div className={errors.city ? 'errorElementRegistration' : null}>
                <InputCity setCity={setCity} city={city} />
                <ErrorMessage error={errors.city} message={"Wybierz miejscowość z podpowiedzi"} />
            </div>
            <div className={errors.gender ? 'errorElementRegistration' : null}>
                <label htmlFor="registrationGender">Płeć</label>
                <select id="registrationGender" onChange={(e) => setGender(e.target.value)}>
                    <option value={null}></option>
                    <option value="man">Mężczyzna</option>
                    <option value="woman">Kobieta</option>
                    <option value="other">Inne</option>
                </select>
                <ErrorMessage error={errors.gender} message={'Jybierz płeć. Jeśli nie chcesz podawać tej informacji wybierz obcję "Inne"'} />
            </div>
            <div className={errors.birth ? 'errorElementRegistration' : null}>
                <label htmlFor="registrationBirth">Rok urodzenia: </label><input type="number" min="1900" placeholder="YYYY" id="registrationBirth" onChange={(e) => setBirth(e.target.value)} />
                <ErrorMessage error={errors.birth} message={'Podaj poprawny rok urodzenia'} />
            </div>
            <div className={errors.password ? 'errorElementRegistration' : null}>
                <label htmlFor="registrationPassword">Hasło: </label><input pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" type="password" id="registrationPassword" onChange={(e) => setPassword(e.target.value)} />
                <ErrorMessage error={errors.password} message={'Hasło musi zawierać przynajmniej 8 znaków. Muszą się w nim znaleźć małe i duże litery oraz cyfra'} />
            </div>
            <div className={errors.confirmPassword ? 'errorElementRegistration' : null}>
                <label htmlFor="registrationPasswordConfirm">Powtórz hasło </label><input type="password" id="registrationPasswordConfirm" onChange={(e) => setConfirmPassword(city)} />
                <ErrorMessage error={errors.confirmPassword} message={'Hasła różnią się od siebie'} />
            </div>
            <button type="submit">Zarejestruj</button>
        </form>


    )
}


export default FormRegistration;