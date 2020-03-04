import React from "react";
import { addBook } from '../../../repos/book';
import AddBookForm from './addBookForm.js';
import IsBookAdded from './isBookAdded';
// import IsRegistered from "../registrationPage/isRegistered";
import { AddBookSearch } from './addBookSearch/AddBookSearch';

const AddBookPage = () => {
    let [addBookSuccess, setAddBookSuccess] = React.useState(null);

    const addBookForm = (book) => {
        addBook(book).then(response => {
            if (response.status !== 200) {
                return setAddBookSuccess(false);
            }
            setAddBookSuccess(true);
        })
    };


    return (
        <div>
            <AddBookSearch></AddBookSearch>
            {addBookSuccess === null ? <AddBookForm addBookForm={addBookForm} /> : <IsBookAdded addBookSuccess={addBookSuccess} />}
        </div >

    );
};

export default AddBookPage;
