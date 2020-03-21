import React, { useEffect, useState } from 'react';
import { UserBookCard } from './userBookCard';
import { getAllBooks, deleteUserBook } from './../../../repos/user';

export const UserBookList = ({ id }) => {
    let [userBooks, setUserBooks] = useState([]);

    useEffect(() => {
        getAllBooks(id)
            .then(res => setUserBooks(res))
            .catch(err => console.log(err));
    }, []);

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
            {userBooks.map((book, i) => (
                <UserBookCard key={i} userBookId={i} image={book.imageUrl} title={book.title}
                              author={book.authors} handleBookDelete={() => {
                    handleBookDelete(id, book);
                }}/>
            ))}
        </div>
    );
};


