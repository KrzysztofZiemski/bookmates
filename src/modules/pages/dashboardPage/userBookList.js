import React, { useEffect, useState } from 'react';
// import { UserBookCard } from './userBookCard';
import { getAllBooks, deleteUserBook } from './../../../repos/user';
import { FilterBooks } from '../../FilterBooks/FilterBooks';
import OptionFilterBook from '../../FilterBooks/OptionFilterBook/OptionFilterBook';
import searchBooks from '../../searchBooks/searchBooks';
import SearchInput from '../../SearchInput/SearchInput';


export const UserBookList = ({ id }) => {
    let [userBooks, setUserBooks] = useState([]);
    let [search, setSearch] = useState('');
    let [filter, setFilter] = useState('categories');
    useEffect(() => {
        getAllBooks(id)
            .then(res => setUserBooks(res))
            .catch(err => console.log(err));
        return getAllBooks
    }, [id]);

    // const handleBookDelete = (id, book) => {
    //     deleteUserBook(id, book.bookId)
    //         .then(data => {
    //             setUserBooks(data);
    //             getAllBooks(id)
    //                 .then(res => setUserBooks(res))
    //                 .catch(err => console.log(err));

    //         })
    //         .catch(err => console.log(err)
    //         );
    // };

    return (
        <>
            <div className="panelBooks">
                <OptionFilterBook setFilter={setFilter} value={filter} />
                <SearchInput setValue={setSearch} />
            </div>
            <FilterBooks books={search.length > 2 ? searchBooks(search, userBooks) : userBooks} filterBy={filter} />
            {/* {userBooks.map((book, i) => (
                <UserBookCard key={i} userBookId={i} image={book.imageUrl} title={book.title}
                    author={book.authors} id={book.bookId} handleBookDelete={() => {
                        handleBookDelete(id, book);
                    }} />
            ))} */}
        </>
    );
};


