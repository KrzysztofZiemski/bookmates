import React from 'react';
import { Form, Input, Label } from 'semantic-ui-react';
import ErrorMessage from './errorMessage';

const InputField = (props) => {
    let { label, setValue, type, error, errorMessage, validate } = props;
    return (
        <>
            <Form.Field className={error ? 'errorElementRegistration' : null}>
                <Label>{label} </Label>
                <Input type={type} onBlur={validate} onChange={(e, data) => {
                    setValue(data.value);
                }
                } />
                <ErrorMessage error={error} message={errorMessage} />
            </Form.Field>
        </>
    )
}

export { InputField };