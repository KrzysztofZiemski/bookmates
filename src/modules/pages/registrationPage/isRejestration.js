import React from 'react';

const IsRejestration = (props) => {
    const { registrationSucces } = props;
    const succesed = <div><h2>Dziekujemy za dokonanie rejestracji</h2></div>;
    const failed = <div><h2>Nie udało się zarejestrować</h2><p>skontaktuje się z administratorem</p></div>;
    if (registrationSucces === false) return failed;
    return succesed;
}


export default IsRejestration;