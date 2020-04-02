import React from 'react';
import getGoogleBooks from '../../../../utils/googleBooksApi';
import { SearchArea } from './searchArea';
import { BookList } from './bookList';
import { addBook } from '../../../../repos/book';


export const AddBookSearch = ({ loggedUser, match, history }) => {

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
            .then(res => {
                setBooks(res);
                // Inserting results from Google Api to Postgres
                res.map(b => {
                    console.log(b.categories);
                    addBook({
                        title: escape(b.title),
                        imageUrl: b.imageLinks.thumbnail,
                        authors: b.authors.join(', '),
                        publishedYear: parseInt(b.publishedDate.split('-')[0]),
                        description: escape(b.description),
                        isbn: b.industryIdentifiers[0].identifier,
                        category: b.hasOwnProperty('categories') ? b.categories : []
                    });
                });
            });
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
            <SearchArea handleSearch={handleSearch} searchBook={searchBook} handleSort={handleSort} id={loggedUser.id}/>
            <BookList books={sortedBooks} id={loggedUser.id} searchBook={() => getGoogleBooks(searchField)}/>
        </div>
    );
};
