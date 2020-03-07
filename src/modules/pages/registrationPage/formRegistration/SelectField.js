import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';
import ErrorMessage from './errorMessage';

const SelectField = (props) => {
    let { label, setValue, options, defaultValue, error, errorMessage, validate } = props;

    return (
        <>
            <Form.Field className={error ? 'errorElementRegistration' : null}>
                <Label>{label} </Label>
                <Select onBlur={validate} onChange={(e, data) => setValue(data.value)} options={options} defaultValue={defaultValue} />
                <ErrorMessage error={error} message={errorMessage} />
            </Form.Field>
        </>
    )
}

export { SelectField };