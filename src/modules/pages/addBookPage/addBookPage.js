import React from "react";
import { addBook } from '../../../repos/book'
import AddBookForm from './addBookForm.js';
import IsBookAdded from './isBookAdded';

const AddBookPage = () => {
    let [addBookSuccess, setAddBookSuccess] = React.useState(null);

    const addBookForm = (book) => {
        addBook(book).then(response => setAddBookSuccess(true))
    }
    return (
        <div>
            {setAddBookSuccess === null ? <AddBookForm addBookForm={addBookForm} /> : <IsBookAdded addBookSuccess= {addBookSuccess} />}

        </div >

    );
};

export default AddBookPage;
