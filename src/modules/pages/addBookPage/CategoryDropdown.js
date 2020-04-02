import faker from 'faker';
import _ from 'lodash';
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import bookGeneres from '../../../utils/bookGeneres';

const addressDefinitions = faker.definitions.address;
const stateOptions = bookGeneres;

const DropdownExampleMultipleSearchSelection = () => (
    <Dropdown
        placeholder='Kategoria'
        fluid
        multiple
        search
        selection
        options={stateOptions}
    />
);

export default DropdownExampleMultipleSearchSelection;
