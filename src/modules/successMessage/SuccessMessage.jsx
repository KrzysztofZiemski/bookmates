import React from 'react';
import './SuccessMessage.scss';

export const SuccessMessage = ({ message, closeError }) => {

    return (
        <div className="ui positive message containerSuccess">
        <i className="close icon" onClick={closeError}></i>
            <div className="header">
                Gratulacje! Operacja się powiodła. 
            </div>
            <p>{message}</p>
        </div>
    )
}