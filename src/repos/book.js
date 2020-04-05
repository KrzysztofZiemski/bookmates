import { BACKEND_URL } from '../const';

const urlBook = `${BACKEND_URL}/book`;

export const getBook = id => {
    return fetch(`${urlBook}/${id}`)
        .then(res => {
            if (res.status !== 200) throw new Error(res.status);
            return res.json();
        });
};

export const getBookUserMetadata = bookId => {
    return fetch(`${urlBook}/${bookId}/metadata`)
        .then(res => {
            if (res.status !== 200) throw new Error(res.status);
            return res.json();
        });
};

export const addBook = (book) => {
    const { isbn, title, authors, publishedYear, imageUrl, description, category } = book;
    let authorsArr = authors.split(',');
    let newBook = { isbn, title, authors: authorsArr, publishedYear, imageUrl, description, category };
    return fetch(urlBook, {
        method: 'POST',
        body: JSON.stringify(newBook),
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const addBookUserMetadata = (bookId, bookEvents) => {
    const bookUserMetadata = {
        userId: bookEvents.userId.toString(),
        userName: bookEvents.userName,
        status: bookEvents.status,
        rating: bookEvents.rating
    };
    return fetch(`${urlBook}/${bookId}/metadata`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookUserMetadata)
    }).then(res => res.json());
};

export const removeUserBookMetadata = (bookId, userId) => {
    return fetch(`${urlBook}/${bookId}/metadata/${userId}`, {
        method: 'DELETE'
    })
        .then(res => res.json());
};

export const updateBook = id => {
    //  return fetch(url, {})
};

export const removeBook = id => {
    //  return fetch(url, {})
};
