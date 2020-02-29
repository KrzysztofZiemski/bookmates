import React from 'react';

const isRegistered = (props) => {
    const { registrationSuccess } = props;
    const successful = <div><h2>Dziekujemy za dokonanie rejestracji</h2></div>;
    const failed = <div><h2>Nie udało się zarejestrować</h2><p>skontaktuje się z administratorem</p></div>;
    if (registrationSuccess === false) return failed;
    return successful;
}


export default isRegistered;