import React from 'react';
import { Form, Label, Input } from 'semantic-ui-react';
import ErrorMessage from './errorMessage';
import getCitiesGoogle from '../../../../utils/autoCompliteGoogle';

const InputCity = (props) => {
    const { city, setCity, error, setError } = props;
    let [cityList, setCityList] = React.useState("");
    let [inputValue, setInputValue] = React.useState("");

    const errorMessage = "Wybierz misto z listy podpowiedzi";

    const hideList = () => {
        setTimeout(setCityList(null), 0);

    }
    const validate = () => {
        if (!city) return setError(false);
        setError(true)
    }

    const handleCityInput = (e, data) => {

        setInputValue(data.value);
        setCity(null);
        getCitiesGoogle(data.value)
            .then(res => {
                if (res.status !== 200) throw new Error(res.status);
                return res.json();
            }).then(data => {
                const citiesName = data.filter(city => city.types[0] === "locality");
                const listTips = citiesName.map(city => <li key={city.description}> <button onClick={(e) => {
                    setCity(city.description);
                    setError(false);
                    setInputValue(city.description);

                }}>{city.description}</button></li>);

                setCityList(listTips)
                window.addEventListener('click', () => setCityList(null))
            })
            .catch(err => console.log('błąd', err))
    }


    return (
        <Form.Field className={error ? 'errorElementRegistration' : null}>
            <Label htmlFor="registrationCity">Miejscowość: </Label>
            <div className="inputCityContainer">
                <Input className="inputCity" value={inputValue} onBlur={validate} autoComplete="none" type="text" id="registrationCity" onFocus={hideList} onChange={handleCityInput} />
                <ul className="cityTips">{cityList}</ul>
            </div>
            <ErrorMessage error={error} message={errorMessage} />
        </Form.Field>
    )
}


export default InputCity;