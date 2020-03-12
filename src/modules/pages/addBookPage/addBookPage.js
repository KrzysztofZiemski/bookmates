import React from 'react';
import { addBook } from '../../../repos/book';
import AddBookForm from './addBookForm.js';
import { addBookToShelf } from '../../../repos/user';
import IsBookAdded from './isBookAdded';
// import IsRegistered from "../registrationPage/isRegistered";
import { AddBookSearch } from './addBookSearch/AddBookSearch';

const AddBookPage = (props) => {
    let [addBookSuccess, setAddBookSuccess] = React.useState(null);
    const { loggedUser } = props;
    const addBookForm = (book) => {
        addBook(book).then(response => {
            if (response.status !== 200) {
                return setAddBookSuccess(false);
            }
            setAddBookSuccess(true);
            addBookToShelf({ bookId: book.isbn, ...book }, loggedUser.id)
                .then(data => console.log(data))
                .catch(err => console.log(err));

        });

    };


    return (
        <div>
            <AddBookSearch loggedUser={loggedUser}></AddBookSearch>
            {addBookSuccess === null ? <AddBookForm addBookForm={addBookForm}/> :
                <IsBookAdded addBookSuccess={addBookSuccess}/>}
        </div>

    );
};

export default AddBookPage;
