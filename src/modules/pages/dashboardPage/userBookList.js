import React, { useEffect, useState } from 'react';
import { UserBookCard } from './userBookCard';
import { getAllBooks, deleteUserBook } from './../../../repos/user';
import { FilterBooks } from '../../FilterBooks/FilterBooks';

export const UserBookList = ({ id }) => {
    let [userBooks, setUserBooks] = useState([]);

    useEffect(() => {
        getAllBooks(id)
            .then(res => setUserBooks(res))
            .catch(err => console.log(err));
    }, [getAllBooks]);

    const handleBookDelete = (id, book) => {
        deleteUserBook(id, book.bookId)
            .then(data => {
                setUserBooks(data);
                getAllBooks(id)
                    .then(res => setUserBooks(res))
                    .catch(err => console.log(err));

            })
            .catch(err => console.log(err)
            );
    };

    return (
        <div className="list">
            <FilterBooks books={userBooks} filterBy={'authors'} onClick={handleBookDelete} id={id} />
            {/* {userBooks.map((book, i) => (
                <UserBookCard key={i} userBookId={i} image={book.imageUrl} title={book.title}
                    author={book.authors} id={book.bookId} handleBookDelete={() => {
                        handleBookDelete(id, book);
                    }} />
            ))} */}
        </div>
    );
};


