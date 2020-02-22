import React from 'react';
import getCitiesGoogle from '../../../utils/autoCompliteGoogle';
import { Button, Input, Label } from 'semantic-ui-react';

const InputCity = (props) => {
    const { city, setCity, validateCity, setErrorCity, children } = props;
    let [cityList, setCityList] = React.useState("");

    const hideList = () => {
        setTimeout(setCityList(null), 0);
        validateCity()
    }

    const handleCityInput = (e, data) => {
        setCity({ value: data.value, picked: false })
        if (city.value.length < 2) return
        getCitiesGoogle(data.value)
            .then(res => {
                if (res.status !== 200) throw new Error(res.status);
                return res.json();
            }).then(data => {
                const citiesName = data.filter(city => city.types[0] === "locality");
                const listTips = citiesName.map(city => <li key={city.description}> <Button onClick={(e) => {
                    setCity({ value: city.description, picked: true });
                    setErrorCity(false);
                }}>{city.description}</Button></li>)

                setCityList(listTips)
                window.addEventListener('click', () => setCityList(null))
            })
            .catch(err => console.log('błąd', err))
    }


    return (
        <>
            <Label htmlFor="registrationCity">Miejscowość: </Label>
            <Input class="inputCity" autoComplete="none" type="text" id="registrationCity" onFocus={hideList} value={city.value} onChange={handleCityInput} onBlur={validateCity} />
            {children}
            <ul className="cityTips">{cityList}</ul>
        </>
    )
}


export default InputCity;