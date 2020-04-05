import React, { useState, useEffect } from 'react';
import { getBook, addBookUserMetadata, getBookUserMetadata, removeUserBookMetadata } from '../../../repos/book';
import { addBookToShelf, getAllBooks, deleteUserBook } from '../../../repos/user';
import { List } from 'semantic-ui-react';
import { ButtonBasic } from '../../Button/Button';
import { Link } from 'react-router-dom';
import './bookPage.scss';

const BookPage = ({ match, loggedUser }) => {
    const [book, setBook] = useState([]);
    const [userBooks, setUserBooks] = useState([]);
    const [otherUserBooks, setOtherUserBooks] = useState([]);


    useEffect(() => {

        getBook(match.params.id)
            .then(res => {
                setBook(res[0]);
                getBookUserMetadata(res[0].isbn)
                    .then(res => {
                        const indexOfCurrUser = res.map(user => parseInt(user.userId)).indexOf(loggedUser.id);
                        if (indexOfCurrUser === -1) {
                            setOtherUserBooks(res);
                        } else setOtherUserBooks(res.splice(indexOfCurrUser, 1));
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        getAllBooks(loggedUser.id)
            .then(res => setUserBooks(res))
            .catch(err => console.log(err));

    }, [getBook, getAllBooks, getBookUserMetadata, match.params.id]);

    const handleAdd = () => {
        const userBook = {
            bookId: book.isbn,
            title: book.title,
            imageUrl: book.imageurl,
            authors: book.authors.join(', '),
            publishedYear: book.publishedYear.toString(),
            categories: book.category
        };
        addBookToShelf(userBook, loggedUser.id)
            .then(data => {
                getAllBooks(loggedUser.id)
                    .then(res => setUserBooks(res))
                    .catch(err => console.log(err));

            })
            .catch(err => console.log(err));
        addBookUserMetadata(book.isbn, {
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
            <div className='card-container-book'>
                <img src={book.imageurl} alt=""/>
                <div className="desc">
                    <h2>{unescape(book.title)}</h2>
                    <h3>{book.authors}</h3>
                    <h4>{book.publishedYear}</h4>
                    <p>{unescape(book.description)}</p>
                    {userBooks.map(b => b.bookId).indexOf(book.isbn) === -1 ?
                        (<ButtonBasic handleClick={handleAdd} content='Dodaj na półkę'/>) :
                        (<ButtonBasic handleClick={handleRemove} content='Usuń z półki'/>)}
                </div>
            </div>
            <aside className="matesThatHaveBook">
                <h1>Użytkownicy, którzy mają tę książkę</h1>
                <List> {otherUserBooks.map((user, i) => (<Link to={`/user/${user.userId}`} key={i}>
                    <li>{user.userName}</li>
                </Link>))}</List>
            </aside>


        </div>) : (<div>Book with id {match.params.id} does not exist</div>);
};

export default BookPage;
