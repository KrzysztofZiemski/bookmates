import React from 'react';
import { BookCard } from './bookCard';
import { addBookToShelf } from '../../../../repos/user';
export const BookList = ({ id, books }) => {

    const handleSubmit = ({ title, imageLinks, authors, industryIdentifiers }) => {
        const book = {
            bookId: industryIdentifiers[0].identifier,
            title,
            imageUrl: imageLinks.thumbnail,
            authors: authors.join(', ')
        };

        addBookToShelf(book, id)
            .then(data => console.log(data))
            .catch(err => console.log(err));
    };

    return (
        <div className="list">
            {books.map((book, i) => (
                <BookCard key={i} image={book.imageLinks.thumbnail} title={book.title}
                    author={book.authors.join(', ')}
                    published={book.publishedDate} handleSubmit={() => handleSubmit(book)} />
            ))}
        </div>
    );
};
