import React, { useState, useEffect } from 'react';
import BookItem from './BookItem';
import { getBook } from '../../../repos/book';
import { Link } from 'react-router-dom';

const BookPage = ({ match }) => {
    let [book, setBook] = useState({});

    useEffect(() => {
        getBook(match.params.id)
            .then(res => setBook(res[0]))
            .catch(err => console.log(err));
        console.log(book);
    }, [getBook]);


    return (
        <div className="card-container">
            <img src={book.imageurl} alt=""/>
            <div className="desc">
                <h2>{unescape(book.title)}</h2>
                <h3>{book.authors}</h3>
                <h4>{book.publishedYear}</h4>
                <p>{unescape(book.description)}</p>
            </div>
        </div>
    );
};

export default BookPage;
