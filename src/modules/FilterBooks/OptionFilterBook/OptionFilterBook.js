import React from 'react';
import './OptionFilterBook.scss';
import { Form, Input, Label } from 'semantic-ui-react';

const OptionFilterBook = ({ setFilter, value }) => {

    const selectTypes = [
        {
            name: 'categories',
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
        <div>
            <Form>
                {showOptions()}
                {/* <Form.Group inline>
                    <label>Grupuj po</label>
                    <Form.Radio
                        label='Autorzy'
                        value='sm'
                        checked={value === 'sm'}
                        onChange={this.handleChange}
                    />
                    <Form.Radio
                        label='Kategorie'
                        value='md'
                        checked={value === 'md'}
                    // onChange={this.handleChange}
                    />
                    <Form.Radio
                        label='Rok wydania'
                        value='lg'
                        checked={value === 'lg'}
                    // onChange={this.handleChange}
                    />
                </Form.Group> */}
            </Form>
        </div >
    )
}
export default OptionFilterBook;