import React from 'react';
import './SearchBook.scss';
import { Input } from 'semantic-ui-react';


const SearchBook = () => {
    return (
        <div>
            <Input
                icon={{ name: 'search', circular: true, link: true }}
                placeholder='Search...'
                onClick={() => console.log('aaaa')}
            />
        </div>
    )
}

export default SearchBook;