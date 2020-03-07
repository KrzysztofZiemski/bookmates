import { coutriesList } from './coutriesList';

export const coutriesListOptions = () => {
    const list = coutriesList.map(country => {
        return (
            {
                key: country.code,
                value: country.name_pl,
                text: country.name_pl
            }
        )
    })
    return (
        list
    )
}