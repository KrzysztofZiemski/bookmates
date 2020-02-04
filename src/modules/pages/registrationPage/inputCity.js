import React from 'react';
import getCitiesGoogle from '../../../utils/autoCompliteGoogle';

const InputCity = (props) => {
    const { city, setCity } = props;
    let [cityList, setCityList] = React.useState("");

    const handleCityInput = (e) => {
        setCity({ value: e.target.value, picked: false })
        if (city.value.length < 2) return
        getCitiesGoogle(city.value)
            .then(res => {
                if (res.status !== 200) throw new Error(res.status);
                return res.json();
            }).then(data => {
                const citiesName = data.filter(city => city.types[0] === "locality");
                const listTips = citiesName.map(city => <li key={city.description} onClick={() => setCity({ value: city.description, picked: true })}>{city.description}</li>)
                setCityList(listTips)
            })
            .catch(err => console.log('błąd', err))
    }


    return (
        <>
            <label htmlFor="registrationCity">Miejscowość: </label>
            <input autoComplete="none" type="text" id="registrationCity" value={city.value} onChange={handleCityInput} />
            <ul className="cityTips">{cityList}</ul>
        </>
    )
}


export default InputCity;