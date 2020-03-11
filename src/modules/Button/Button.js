import React from "react";
import { Button } from 'semantic-ui-react';
import './Button.scss';
const ButtonBasic = (props) => {
    const { content, handleClick } = props;
    return (
        <Button className="buttonBasic" secondary onClick={handleClick}>{ content }</Button>
    );
}
export { ButtonBasic };