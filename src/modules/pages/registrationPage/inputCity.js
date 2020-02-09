import React from 'react';
import getCitiesGoogle from '../../../utils/autoCompliteGoogle';

const InputCity = (props) => {
    const { city, setCity, validateCity, setErrorCity } = props;
    let [cityList, setCityList] = React.useState("");

    const hideList = (e) => {
        window.addEventListener('click', () => {
            setCityList(null);
            console.log('window')
            //nie dział remove
            window.removeEventListener('click', () => setCityList(null))
        })
    }
    const handleCityInput = (e) => {
        setCity({ value: e.target.value, picked: false })
        if (city.value.length < 2) return
        getCitiesGoogle(city.value)
            .then(res => {
                if (res.status !== 200) throw new Error(res.status);
                return res.json();
            }).then(data => {
                const citiesName = data.filter(city => city.types[0] === "locality");
                const listTips = citiesName.map(city => <li key={city.description} onClick={(e) => {
                    e.stopPropagation();
                    setCity({ value: city.description, picked: true });
                    setCityList(null);
                    setErrorCity(false);
                }}>{city.description}</li>)

                setCityList(listTips)
                window.addEventListener('click', () => setCityList(null))
            })
            .catch(err => console.log('błąd', err))
    }


    return (
        <>
            <label htmlFor="registrationCity">Miejscowość: </label>
            <input autoComplete="none" type="text" id="registrationCity" onFocus={hideList} value={city.value} onChange={handleCityInput} onBlur={validateCity} />

            <ul className="cityTips">{cityList}</ul>
        </>
    )
}


export default InputCity;