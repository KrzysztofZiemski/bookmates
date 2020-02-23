import React from 'react';

const IsBookAdded = (props) => {
    //const { setBookSuccess } = props;
    const successful = <div><h2>Dziękujemy za dodanie książki!</h2></div>;
    const failed = <div><h2>Nie udało się dodać książki</h2><p>skontaktuj się z administratorem pod numerem </p></div>;
    console.log(props);
    if (props.addBookSuccess === false) return failed;
    return successful;
}


export default IsBookAdded;