import React from 'react';
import { addBook } from '../../../repos/book';
import AddBookForm from './addBookForm.js';
import { addBookToShelf } from '../../../repos/user';
import { SuccessMessage } from '../../successMessage/SuccessMessage';
import { ErrorMessage } from '../../ErrorMessage/ErrorMessage';
// import IsRegistered from "../registrationPage/isRegistered";
// import { AddBookSearch } from './addBookSearch/AddBookSearch';

const AddBookPage = (props) => {
    let [addBookSuccess, setAddBookSuccess] = React.useState(null);
    let [message, setMessage] = React.useState('');
    const { loggedUser } = props;
    const closeMessage = () => {
        setAddBookSuccess(null)

    }
    const addBookForm = async (book) => {
        addBook(book)
            .then(response => {
                if (response.status === 200) return response.json();
                throw new Error()
            })
            .then(data => {
                if (data !== undefined && data.hasOwnProperty('code') && data.code === '23505') {
                    //todo co tu chciałeś zrobić?
                    // setMessage('Książka już jest dodana do Twojej biblioteki');
                    //setAddBookSuccess(false);
                }
                if (data === undefined) {
                    //todo co tu chciałeś zrobić?
                }
                //
            })
            .catch(err => {
                // setMessage('Nie udało się dodać książki. Jeżeli sytuacja będzie się powtarzać, skontaktuj się z administratorem');
                // setAddBookSuccess(false);
            })
        addBookToShelf({ bookId: book.isbn, ...book }, loggedUser.id)
            .then(data => {
                setMessage('Dodano książkę');
                setAddBookSuccess(true);
            }).catch(err => {
                setMessage('Nie udało się dodać książki. Jeżeli sytuacja będzie się powtarzać, skontaktuj się z administratorem');
                setAddBookSuccess(false);
            });
    };


    return (
        <div className="addBookPage">
            {addBookSuccess === false ? <ErrorMessage message={message} closeError={closeMessage} /> : null}
            {addBookSuccess === true ? <SuccessMessage message={message} closeError={closeMessage} /> : null}
            {/* <AddBookSearch loggedUser={loggedUser}></AddBookSearch> */}
            <AddBookForm addBookForm={addBookForm} addBookSuccess={addBookSuccess} />
        </div>

    );
};

export default AddBookPage;
