
import Geocode from "react-geocode";
import { ApiKeyMaps } from "../config";

Geocode.setApiKey(ApiKeyMaps);
Geocode.setLanguage("pl");

export const getCoords = (adress) => {
    console.log(adress)
    return Geocode.fromAddress(adress).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            return { lat, lng };
        },
        error => {
            console.error(error);
        }
    );
}

