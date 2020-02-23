import { BACKEND_URL } from "../const";
const urlBook = `${BACKEND_URL}/book/`;

export const getBook = id => {
  //return...  fetch(url, {})
};

export const addBook = (book) => {
  return fetch(urlBook, {
    method: 'POST',
    body: JSON.stringify(book),
    headers: {
        'Content-Type': 'application/json'
    },
  })
};

export const updateBook = id => {
  //  return fetch(url, {})
};

export const removeBook = id => {
  //  return fetch(url, {})
};