import React from 'react';
import { Input } from 'semantic-ui-react';

const SearchInput = ({ setValue }) => {

    return (
        <div className="searchBar">
            <Input
                placeholder='Search...'
                onChange={(semantic, event) => setValue(event.value)}
            />
        </div>
    )
}
export default SearchInput;