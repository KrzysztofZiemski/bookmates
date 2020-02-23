import React from 'react';

const IsBookAdded = (props) => {
    const { setBookSuccess } = props;
    const successful = <div><h2>Dziękujemy za dodadnie książki!</h2></div>;
    const failed = <div><h2>Nie udało się dodać książki</h2><p>skontaktuj się z administratorem</p></div>;
    if (setBookSuccess === false) return failed;
    return successful;
}


export default IsBookAdded;