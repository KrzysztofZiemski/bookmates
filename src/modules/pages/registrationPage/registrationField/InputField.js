import React from 'react';
import { Form, Input, Label } from 'semantic-ui-react';
import ErrorMessage from './errorMessage';

const InputField = (props) => {
    let { label, value, setValue, condition, type, error, setError } = props;

    const validate = () => {

        if (condition.hasOwnProperty('length') && value.length < condition.length) return setError(true);
        if (condition.hasOwnProperty('pattern') && !value.match(condition.pattern)) return setError(true);
        if (condition.hasOwnProperty('isTrue') && !condition.isTrue) return setError(true);
        setError(false)
    }
    return (
        <>
            <Form.Field className={error ? 'errorElementRegistration' : null}>
                <Label>{label} </Label>
                <Input type={type} onBlur={validate} onChange={(e, data) => {
                    setValue(data.value)
                }
                } />
                <ErrorMessage error={error} message={condition.message} />
            </Form.Field>
        </>
    )
}

export { InputField };