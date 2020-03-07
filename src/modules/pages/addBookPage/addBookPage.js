import React from "react";
import { addBook } from '../../../repos/book';
import AddBookForm from './addBookForm.js';
import IsBookAdded from './isBookAdded';
// import IsRegistered from "../registrationPage/isRegistered";
import { AddBookSearch } from './addBookSearch/AddBookSearch';

const AddBookPage = (props) => {
    let [addBookSuccess, setAddBookSuccess] = React.useState(null);
    const { loggedUser } = props;
    const addBookForm = (book) => {
        console.log(book)
        addBook(book).then(response => {
            if (response.status !== 200) {
                return setAddBookSuccess(false);
            }
            setAddBookSuccess(true);
        })
    };


    return (
        <div>
            <AddBookSearch loggedUser={loggedUser}></AddBookSearch>
            {addBookSuccess === null ? <AddBookForm addBookForm={addBookForm} /> : <IsBookAdded addBookSuccess={addBookSuccess} />}
        </div >

    );
};

export default AddBookPage;
