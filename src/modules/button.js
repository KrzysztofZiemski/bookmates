import React from "react";
import { Button } from 'semantic-ui-react';

const ButtonBasic = (props) => {
    const { content, handleClick } = props;
    return (
        <Button secondary onClick={handleClick}>{ content }</Button>
    );
}
export { ButtonBasic };