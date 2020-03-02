import React from 'react';
import { Form, Label, Input } from 'semantic-ui-react';
import ErrorMessage from './errorMessage';
import getCitiesGoogle from '../../../../utils/autoCompliteGoogle';

const InputCity = (props) => {
    const { city, setCity } = props;
    let [cityList, setCityList] = React.useState("");
    let [inputValue, setInputValue] = React.useState("");
    const errorMessage = "Wybierz misto z listy podpowiedzi";
    let [errorCity, setErrorCity] = React.useState(null);

    const hideList = () => {
        setTimeout(setCityList(null), 0);

    }
    const validate = () => {
        if (!city) return setErrorCity(true);
        setErrorCity(false)
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
                    setErrorCity(false);
                    setInputValue(city.description);

                }}>{city.description}</button></li>);

                setCityList(listTips)
                window.addEventListener('click', () => setCityList(null))
            })
            .catch(err => console.log('błąd', err))
    }


    return (
        <Form.Field className={errorCity ? 'errorElementRegistration' : null}>
            <Label htmlFor="registrationCity">Miejscowość: </Label>
            <div className="inputCityContainer">
                <Input className="inputCity" value={inputValue} onBlur={validate} autoComplete="none" type="text" id="registrationCity" onFocus={hideList} onChange={handleCityInput} />
                <ul className="cityTips">{cityList}</ul>
            </div>
            <ErrorMessage error={errorCity} message={errorMessage} />
        </Form.Field>
    )
}


export default InputCity;