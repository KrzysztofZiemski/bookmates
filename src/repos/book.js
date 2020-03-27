import { BACKEND_URL } from '../const';

const urlBook = `${BACKEND_URL}/book`;

export const getBook = id => {
    return fetch(`${urlBook}/${id}`)
        .then(res => {
            if (res.status !== 200) throw new Error(res.status);
            console.log(res);
            return res.json();
        });
};

export const addBook = (book) => {
    const { isbn, title, authors, publishedYear, imageUrl, description } = book;
    let authorsArr = authors.split(',');
    let newBook = { isbn, title, authors: authorsArr, publishedYear, imageUrl, description };
    return fetch(urlBook, {
        method: 'POST',
        body: JSON.stringify(newBook),
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const updateBook = id => {
    //  return fetch(url, {})
};

export const removeBook = id => {
    //  return fetch(url, {})
};
