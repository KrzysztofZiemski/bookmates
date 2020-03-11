import React from 'react';
import { Form, Label, Input } from 'semantic-ui-react';
import ErrorMessage from './errorMessage';
import getCitiesGoogle from '../../../../utils/autoCompliteGoogle';

const InputCity = (props) => {
    const { city, setCity, error, setError, validate } = props;
    let [cityList, setCityList] = React.useState("");

    const errorMessage = "Wybierz misto z listy podpowiedzi";

    const hideList = () => {
        setTimeout(setCityList(null), 0);

    }

    const handleCityInput = (e, data) => {
        setCity({ value: data.value, picked: false });
        getCitiesGoogle(data.value)
            .then(res => {
                if (res.status !== 200) throw new Error(res.status);
                return res.json();
            }).then(data => {
                const citiesName = data.filter(city => city.types[0] === "locality");
                const listTips = citiesName.map(city => <li key={city.description}> <button onClick={(e) => {
                    setCity({ value: city.description, picked: true });
                    setError(false);

                }}>{city.description}</button></li>);

                setCityList(listTips)
                window.addEventListener('click', () => setCityList(null))
            })
            .catch(err => setError(true))
    }


    return (
        <Form.Field className={error ? 'errorElementRegistration' : null}>
            <Label htmlFor="registrationCity">Miejscowość: </Label>
            <div className="inputCityContainer">
                <Input className="inputCity" value={city.value} onBlur={validate} autoComplete="none" type="text" id="registrationCity" onFocus={hideList} onChange={handleCityInput} />
                <ul className="cityTips">{cityList}</ul>
            </div>
            <ErrorMessage error={error} message={errorMessage} />
        </Form.Field>
    )
}


export default InputCity;