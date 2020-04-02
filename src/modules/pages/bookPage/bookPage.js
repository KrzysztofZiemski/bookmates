import React, { useState, useEffect } from 'react';
import { getBook, addBookUserMetadata, getBookUserMetadata, removeUserBookMetadata } from '../../../repos/book';
import { addBookToShelf, getAllBooks, deleteUserBook } from '../../../repos/user';
import { List } from 'semantic-ui-react';

const BookPage = ({ match, loggedUser }) => {
    const [book, setBook] = useState([]);
    const [userBooks, setUserBooks] = useState([]);
    const [otherUserBooks, setOtherUserBooks] = useState([]);


    useEffect(() => {
        getBookUserMetadata(1045)
            .then(res => {
                console.log(loggedUser.id);
                console.log(res);
                const indexOfCurrUser = res.map(user => parseInt(user.userId)).indexOf(loggedUser.id);
                console.log(indexOfCurrUser);
                if (indexOfCurrUser === -1) {
                    return setOtherUserBooks(res);
                }
                return setOtherUserBooks(res.splice(indexOfCurrUser, 1));
                console.log(otherUserBooks);
            })
            .catch(err => console.log(err));
        getBook(match.params.id)
            .then(res => setBook(res[0]))
            .catch(err => console.log(err));
        console.log(book);
        getAllBooks(loggedUser.id)
            .then(res => setUserBooks(res))
            .catch(err => console.log(err));
    }, [getBook, getAllBooks, getBookUserMetadata]);
    console.log(book);

    const handleAdd = () => {
        const userBook = {
            bookId: book.isbn,
            title: book.title,
            imageUrl: book.imageurl,
            authors: book.authors.join(', '),
            publishedYear: book.publishedYear.toString(),
            categories: book.category
        };
        console.log(userBook);
        addBookToShelf(userBook, loggedUser.id)
            .then(data => {
                console.log(data);
                getAllBooks(loggedUser.id)
                    .then(res => setUserBooks(res))
                    .catch(err => console.log(err));

            })
            .catch(err => console.log(err));
        addBookUserMetadata(book.id, {
            userId: loggedUser.id,
            userName: loggedUser.name,
            status: 'inlibrary',
            rating: ''
        });


    };
    const handleRemove = () => {

        deleteUserBook(loggedUser.id, book.isbn)
            .then(data => {
                setUserBooks(data);
                getAllBooks(loggedUser.id)
                    .then(res => setUserBooks(res))
                    .catch(err => console.log(err));

            })
            .catch(err => console.log(err));
        removeUserBookMetadata(book.id, loggedUser.id);
    };
    return book !== undefined ?
        (<div className="card-container">
            <img src={book.imageurl} alt=""/>
            <div className="desc">
                <h2>{unescape(book.title)}</h2>
                <h3>{book.authors}</h3>
                <h4>{book.publishedYear}</h4>
                <p>{unescape(book.description)}</p>
                {userBooks.map(b => b.bookId).indexOf(book.isbn) === -1 ?
                    (<button onClick={handleAdd}>Dodaj na półkę</button>) :
                    (<button onClick={handleRemove}>Usuń z półki</button>)}
            </div>
            <aside className="matesThatHaveBook">
                <h1>Użytkownicy, którzy mają tę książkę</h1>
                <List> {otherUserBooks.map(user => <li>{user.userName}</li>)}</List>
            </aside>


        </div>) : (<div>Book with id {match.params.id} does not exist</div>);
};

export default BookPage;
