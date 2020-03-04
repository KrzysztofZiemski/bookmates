const getGoogleBooks = (book) => {
    const link = `http://localhost:3010/googleBooks/${book}`;
    return fetch(link)
}

export default getGoogleBooks;