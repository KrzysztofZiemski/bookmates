import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const ErrorMessage = (props) => {
    const { message, error } = props;
    let icon;
    switch (error) {
        case true:
            icon = <><span className="errorIcon red"><FontAwesomeIcon icon={faTimesCircle} /></span><div className="registrationErrorMessage">{message}</div></>;
            break;
        case false:
            icon = < span className="errorIcon green"> <FontAwesomeIcon className={"errorSign"} icon={faCheckCircle} /></span >;
            break;
        default:
            icon = <span></span>;

    }

    return (
        icon
    )
}

export default ErrorMessage;