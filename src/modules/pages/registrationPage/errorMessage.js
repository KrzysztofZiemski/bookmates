import React from 'react';

const ErrorMessage = (props) => {
    const { message, error } = props;
    const element = error ? <div className="registrationErrorMessage">{message}</div> : null;
    return (
        element
    )
}

export default ErrorMessage;