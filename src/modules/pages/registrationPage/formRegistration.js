import React from 'react';
import { getCoords } from '../../../utils/geoLocation';
import { placeAutoComplite } from '../../../utils/autoCopliteGoogle';
import { CoutriesListOptions } from './coutriesListOptions';


const FormRegistration = (props) => {
    const { sendRegistrationForm } = props;
    let [name, setName] = React.useState("");
    let [mail, setMail] = React.useState("");
    let [country, setCountry] = React.useState("POLSKA");
    let [city, setCity] = React.useState("");
    let [gender, setGender] = React.useState("");
    let [birth, setBirth] = React.useState("");
    let [password, setPassword] = React.useState("");
    let [confirmPassword, setConfirmPassword] = React.useState("");


    // .then(response => json(response)).then(data => console.log(data))
    //     .catch(err => console.log('error', err))

    const handleAutoComplite = () => {
        placeAutoComplite(city)
            .then(res => {
                return res.text()
            }).then(data => console.log('sukcess', data))
            .catch(err => console.log('błąd', err))
    }
    const handleRegistration = async (e) => {
        e.preventDefault()
        if (name && mail && country && city && gender && birth && password && confirmPassword) {
            if (password !== confirmPassword) return alert.log('Podane hasła nie są jednakowe');

            const coordFromGoogle = await getCoords(`${country} ${city}`).catch(e => console.log(e));
            const coords = coordFromGoogle === undefined || !city ? "" : coordFromGoogle;

            const user = { name, mail, country, city, gender, birth, password, coords }

            sendRegistrationForm(user).then(response => console.log('response'))
        } else {
            console.log('nie wypełnione pole')
        }
    }
    return (

        <form className="registrationForm" onSubmit={handleRegistration}>
            <div>
                <label htmlFor="registrationName">Użytkownik: </label><input type="text" id="registrationName" onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="registrationMail">E-mail: </label><input type="text" id="registrationMail" onChange={(e) => setMail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="registrationCountry">Państwo: </label>
                <select id="registrationCountry" onChange={(e) => setCountry(e.target.value)}>
                    <CoutriesListOptions />
                </select>
            </div>
            <div>
                <label htmlFor="registrationCity">Miasto: </label><input type="text" id="registrationCity" onKeyUp={handleAutoComplite} onChange={(e) => setCity(e.target.value)} />
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
                <label htmlFor="registrationPasswordConfirm">Powtórz hasło </label><input type="text" id="registrationPasswordConfirm" onChange={(e) => setConfirmPassword(city)} />
            </div>
            <button type="submit">Zarejestruj</button>
        </form>


    )
}


export default FormRegistration;