import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const ErrorMessage = (props) => {
    const { message, error } = props;
    let icon;
    switch (error) {
        case true:
            icon = <><span><FontAwesomeIcon icon={faTimesCircle} /></span><div className="registrationErrorMessage">{message}</div></>;
            break;
        case false:
            icon = < span > <FontAwesomeIcon icon={faCheckCircle} /></span >;
            break;
        default:
            icon = null;

    }

    return (
        icon
    )
}

export default ErrorMessage;