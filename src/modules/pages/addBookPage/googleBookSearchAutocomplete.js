const queryLink = (queryFor, queryTerm) => `https://www.googleapis.com/books/v1/volumes?q=${queryFor === '' ? '' : queryFor + ':'}${queryTerm}&maxResults=5`;

export const getGoogleBooksQuery = (queryFor, queryTerm) => {
    return fetch(queryLink(queryFor, queryTerm))
        .then(response => response.json())
        .catch(e => {
            console.log('error', e);
        });
};
