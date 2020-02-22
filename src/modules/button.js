import React from "react";
import { Button } from 'semantic-ui-react';

const ButtonBasic = (props) => {
    const { content, handleClick } = props;
    return (
        <Button className="buttonBasic" secondary onClick={handleClick}>{ content }</Button>
    );
}
export { ButtonBasic };