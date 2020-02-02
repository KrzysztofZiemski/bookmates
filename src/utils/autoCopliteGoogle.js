export const autoCopliteGoogle = (city) => {
    const link = `http://localhost:3010/filters/${city}`;

    return fetch(link)
}
