import React from 'react';
import { Form, Input, Label } from 'semantic-ui-react';
import ErrorMessage from '../registrationPage/formRegistration/errorMessage';

const InputName = (props) => {
    let { label, value, setValue, type, error, errorMessage, validate } = props;
    return (
        <>
            <Form.Field className={error ? 'errorElementRegistration' : null}>
                <Label>{label}</Label>
                <Input type={type} value={value} onBlur={validate} onChange={(e, data) => {
                    setValue(data.value);
                }
                } />
                <ErrorMessage error={error} message={errorMessage} />
            </Form.Field>
        </>
    )
}

export { InputName };