import { coutriesList } from './coutriesList';
import React from 'react';

export const CoutriesListOptions = () => {
    const list = coutriesList.map(country => {
        return (
            <option key={country.code} value={country.name_pl}>
                {country.name_pl}
            </option>
        )
    })
    return (
        list
    )
}