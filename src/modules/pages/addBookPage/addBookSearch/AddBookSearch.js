import React from 'react';
import getGoogleBooks from '../../../../utils/googleBooksApi';
import { SearchArea } from './searchArea';
import { BookList } from './bookList';

export const AddBookSearch = (props) => {
    const { loggedUser } = props;

    let [books, setBooks] = React.useState([]);
    let [searchField, setSearchField] = React.useState('');
    let [sort, setSort] = React.useState('');

    const searchBook = (e) => {
        e.preventDefault();
        if (searchField.length < 1) return;
        getGoogleBooks(searchField)
            .then(res => {
                if (res.status !== 200) throw new Error(res.status);
                return res.json();
            })
            .then(res => setBooks(res));
    };


    const handleSearch = (e) => {
        setSearchField(e.target.value);

    };

    const handleSort = (e) => {
        setSort(e.target.value);
    };

    const sortedBooks = books.sort((a, b) => {
        if (sort === 'Newest') {
            return parseInt(b.publishedDate.substring(0, 4)) - parseInt(a.publishedDate.substring(0, 4));
        } else if (sort === 'Oldest') {
            return parseInt(a.publishedDate.substring(0, 4)) - parseInt(b.publishedDate.substring(0, 4));
        }
    });


    return (
        <div>
            <SearchArea handleSearch={handleSearch} searchBook={searchBook} handleSort={handleSort} id={loggedUser.id} />
            <BookList books={sortedBooks} id={loggedUser.id} />
        </div>
    )
}