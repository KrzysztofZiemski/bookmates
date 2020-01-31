import { ApiKeyMaps } from "../config";

export const placeAutoComplite = (place) => {
    const link = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=wars&key=${ApiKeyMaps}&language=pl`;
    return fetch(link, {
        method: 'GET',
        mode: 'no-cors'
    })
}
