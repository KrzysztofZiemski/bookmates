import { BACKEND_URL } from '../const';

const getCitiesGoogle = (city) => {
    const link = `${BACKEND_URL}/filters/${city}`;
    return fetch(link);
};

export default getCitiesGoogle;
