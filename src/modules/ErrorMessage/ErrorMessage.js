import React from 'react';
import './ErrorMessage.scss';


export const ErrorMessage = ({ message, closeError }) => {

    return (
        <div className="ui negative message containerError">
            <i className="close icon" onClick={closeError}></i>
            <div className="header">
                Operacja nie powiodła się
            </div>
            <p>{message}</p>
        </div>
    )
}