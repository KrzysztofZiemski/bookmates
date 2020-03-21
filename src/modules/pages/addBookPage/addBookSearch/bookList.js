import React from 'react';
import { BookCard } from './bookCard';
import { addBookToShelf } from '../../../../repos/user';

export const BookList = (props) => {
    const { id, books } = props;
    const handleSubmit = ({ title, imageLinks, authors, industryIdentifiers, publishedDate, categories }) => {
        const book = {
            bookId: industryIdentifiers[0].identifier !== null ? industryIdentifiers[0].identifier : JSON.stringify(Math.floor(Math.random() * 10000)),
            title: escape(title),
            imageUrl: imageLinks.thumbnail,
            authors: authors.join(', '),
            publishedYear: publishedDate,
            categories
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
                          published={book.publishedDate} handleSubmit={() => handleSubmit(book)}/>
            ))}
        </div>
    );
};