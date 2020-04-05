const searchBooks = (value, arr) => {
    if (!Array.isArray(arr)) return false;
    return arr.filter(item => {
        const searchTxt = value.toUpperCase();

        if (item.title.toUpperCase().includes(searchTxt)) {
            return true
        }
        //todo dostosować pod tablice autorów
        if (Array.isArray(item.authors)) {
            //todo nie testowane, ponieważ nie mamy jeszcze tablicy autorów
            item.authors.forEach(author => {
                if (author.toUpperCase().includes(searchTxt)) {
                    return true;
                }
            })
        } else {
            if (item.authors.toUpperCase().includes(searchTxt)) {
                return true
            }
        }
        return false
    })
}
export default searchBooks;