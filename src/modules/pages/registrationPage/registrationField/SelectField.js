import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';
import ErrorMessage from './errorMessage';

const SelectField = (props) => {
    let { label, value, setValue, condition, options, defaultValue } = props;
    let [errorValue, setErrorValue] = React.useState(null);

    const validate = () => {
        if (condition.length < 2) return setErrorValue(true)
        setErrorValue(false)
    }

    return (
        <>
            <Form.Field className={errorValue ? 'errorElementRegistration' : null}>
                <Label>{label} </Label>
                <Select onBlur={validate} onChange={(e, data) => setValue(data.value)} options={options} defaultValue={defaultValue} />
                <ErrorMessage error={errorValue} message={condition.message} />
            </Form.Field>
        </>
    )
}

export { SelectField };