import React from 'react';
import { addBook } from '../../../repos/book';
import AddBookForm from './addBookForm.js';
import { addBookToShelf } from '../../../repos/user';
import IsBookAdded from './isBookAdded';
// import IsRegistered from "../registrationPage/isRegistered";
import { AddBookSearch } from './addBookSearch/AddBookSearch';

const AddBookPage = (props) => {
    let [addBookSuccess, setAddBookSuccess] = React.useState(null);
    const [errorMessage, setErrorMessage] = React.useState('');
    const { loggedUser } = props;
    const addBookForm = (book) => {
        addBook(book)
            .then(response => {
                if (response.status !== 200) return response.json();
                return setAddBookSuccess(true);
            })
            .then(data => {
                if (data !== undefined && data.hasOwnProperty('code') && data.code === '23505') {
                    setErrorMessage('Ta książka jest już w twojej biblioteczce!');
                    return setAddBookSuccess(true);
                }
                if (data === undefined) {
                    return setAddBookSuccess(true);
                }
                return setAddBookSuccess(false);
            });
        addBookToShelf({ bookId: book.isbn, ...book }, loggedUser.id)
            .then(data => {
            });

    };


    return (
        <div className="addBookPage">
            {/* <AddBookSearch loggedUser={loggedUser}></AddBookSearch> */}
            {addBookSuccess === null ? <AddBookForm addBookForm={addBookForm} user={loggedUser}/> :
                <IsBookAdded addBookSuccess={addBookSuccess}/>}
        </div>

    );
};

export default AddBookPage;
