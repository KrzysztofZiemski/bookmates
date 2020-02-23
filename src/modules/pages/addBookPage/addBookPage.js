import React from "react";
import { addBook } from '../../../repos/book'
import AddBookForm from './addBookForm.js';
import IsBookAdded from './isBookAdded';
import FormRegistration from "../registrationPage/formRegistration";
import IsRegistered from "../registrationPage/isRegistered";

const AddBookPage = () => {
    let [addBookSuccess, setAddBookSuccess] = React.useState(null);

    const addBookForm = (book) => {
        addBook(book).then(response => {
            if (response.status !== 200){
                console.log(response.status);
                return setAddBookSuccess(false);
            }
            setAddBookSuccess(true);
        })
    };

    return (
        <div>
            {addBookSuccess === null ? <AddBookForm addBookForm={addBookForm} /> : <IsBookAdded addBookSuccess={addBookSuccess} />}

        </div >

    );
};

export default AddBookPage;