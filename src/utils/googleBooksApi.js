import { BACKEND_URL } from '../const';

const getGoogleBooks = (book) => {
    const link = `${BACKEND_URL}/googleBooks/${book}`;
    return fetch(link);
};

export default getGoogleBooks;
