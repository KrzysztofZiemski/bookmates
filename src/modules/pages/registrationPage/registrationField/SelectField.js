import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';
import ErrorMessage from './errorMessage';

const SelectField = (props) => {
    let { label, value, setValue, condition, options, defaultValue, error, setError } = props;

    const validate = () => {
        if (condition.length < 2) return setError(true)
        setError(false)
    }

    return (
        <>
            <Form.Field className={error ? 'errorElementRegistration' : null}>
                <Label>{label} </Label>
                <Select onBlur={validate} onChange={(e, data) => setValue(data.value)} options={options} defaultValue={defaultValue} />
                <ErrorMessage error={error} message={condition.message} />
            </Form.Field>
        </>
    )
}

export { SelectField };