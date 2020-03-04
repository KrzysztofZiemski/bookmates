import React, { useState } from 'react';
import { SearchArea } from './searchArea';
import { BookList } from './bookList';
import getGoogleBooks from '../../../utils/googleBooksApi';
import { UserBookList } from './userBookList';

const Dashboard = (props) => {
    const { loggedUser: { id } } = props;

    let [books, setBooks] = useState([]);
    let [searchField, setSearchField] = useState('');
    let [sort, setSort] = useState('');


    const searchBook = (e) => {
        e.preventDefault();
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
        console.log(e.target.value);
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
            <SearchArea handleSearch={handleSearch} searchBook={searchBook} handleSort={handleSort}/>
            <BookList books={sortedBooks} id={id}/>
            <UserBookList id={id}/>
        </div>
    );
};


export default Dashboard;