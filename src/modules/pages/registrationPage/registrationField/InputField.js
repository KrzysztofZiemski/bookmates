import React from 'react';
import { Form, Input, Label } from 'semantic-ui-react';
import ErrorMessage from './errorMessage';

const InputField = (props) => {
    let { label, value, setValue, condition, type } = props;
    let [errorValue, setErrorValue] = React.useState(null);

    const validate = () => {
        console.log(value)
        if (condition.hasOwnProperty('length') && value.length < condition.length) return setErrorValue(true);
        if (condition.hasOwnProperty('pattern') && !value.match(condition.pattern)) return setErrorValue(true);
        if (condition.hasOwnProperty('isTrue') && !condition.isTrue) return setErrorValue(true);
        setErrorValue(false)
    }
    return (
        <>
            <Form.Field className={errorValue ? 'errorElementRegistration' : null}>
                <Label>{label} </Label>
                <Input type={type} onBlur={validate} onChange={(e, data) => {
                    setValue(data.value)
                }
                } />
                <ErrorMessage error={errorValue} message={condition.message} />
            </Form.Field>
        </>
    )
}

export { InputField };