import { BACKEND_URL } from "../const";
const urlBook = `${BACKEND_URL}/book/`;

export const getBook = id => {
  //return...  fetch(url, {})
};

export const addBook = (book) => {
  const { isbn, title, authors, publishedYear, imageURL, description } = book;
  authors.split(",");
  return fetch(urlBook, {
    method: 'POST',
    body: book,
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