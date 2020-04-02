import React, { useEffect, useState } from 'react';
import { BookCard } from './bookCard';
import { addBookToShelf, deleteUserBook, getAllBooks } from '../../../../repos/user';
import { UserBookCard } from '../../dashboardPage/userBookCard';

export const BookList = ({ id, books, searchBook }) => {
    const [userBooks, setUserBooks] = useState([]);
    useEffect(() => {
        getAllBooks(id)
            .then(res => setUserBooks(res))
            .catch(err => console.log(err));
    }, [getAllBooks]);

    const handleSubmit = ({ title, imageLinks, authors, industryIdentifiers, publishedDate, categories }) => {
        const book = {
            bookId: industryIdentifiers[0].identifier,
            title: escape(title),
            imageUrl: imageLinks.thumbnail,
            authors: authors.join(', '),
            publishedYear: publishedDate,
            categories
        };

        addBookToShelf(book, id)
            .then(data => {
                setUserBooks(data);
                getAllBooks(id)
                    .then(res => setUserBooks(res))
                    .catch(err => console.log(err));

            })
            .catch(err => console.log(err));
    };

    const handleBookDelete = (book) => {
        deleteUserBook(id, book.industryIdentifiers[0].identifier)
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
            {books.map((book, i) => {
                    if (userBooks.map(obj => obj.bookId).indexOf(book.industryIdentifiers[0].identifier) === -1) {
                        return (<BookCard key={i} image={book.imageLinks.thumbnail} title={book.title}
                                          author={book.authors.join(', ')}
                                          published={book.publishedDate} handleSubmit={() => handleSubmit(book)}
                                          handleBookDelete={() => handleBookDelete(book)}
                                          id={book.industryIdentifiers[0].identifier}
                        />);
                    } else {
                        return (<UserBookCard key={i} userBookId={i} image={book.imageLinks.thumbnail} title={book.title}
                                              author={book.authors.join(', ')} id={book.industryIdentifiers[0].identifier}
                                              handleBookDelete={() => handleBookDelete(book)}/>);
                    }
                }
            )}
        </div>
    );
};
