import React from 'react';
import './OptionFilterBook.scss';
import { Form, Input, Label } from 'semantic-ui-react';

const OptionFilterBook = ({ setFilter, value }) => {

    const selectTypes = [
        {
            name: 'category',
            pl: 'Kategorie'
        },
        {
            name: 'authors',
            pl: 'Autorzy'
        },
        {
            name: 'publishedYear',
            pl: 'Rok wydania'
        },
    ]
    const showOptions = () => {
        return selectTypes.map(select => {
            return (<Form.Radio
                key={`${select.name}${select.pl}`}
                label={select.pl}
                value={select.name}
                checked={value === select.name}
                onChange={() => setFilter(select.name)}
            />
            )
        })
    }

    return (

        <Form>
            {showOptions()}
        </Form>

    )
}
export default OptionFilterBook;