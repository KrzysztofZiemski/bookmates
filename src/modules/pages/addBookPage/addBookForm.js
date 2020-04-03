import React from 'react';
import { Form, Input, Label } from 'semantic-ui-react';
import ErrorMessage from './errorMessage';
import { ButtonBasic } from '../../Button/Button';
import './addBookPage.scss';
import { Select } from 'semantic-ui-react';
import { getGoogleBooksQuery } from './googleBookSearchAutocomplete';
import hash from 'object-hash';

import categories from '../../../utils/bookGeneres';
import { Link } from 'react-router-dom';

const AddBookForm = props => {
    const { addBookForm } = props;

    let [isbn, setISBN] = React.useState(0);
    let [title, setTitle] = React.useState('');
    let [authors, setAuthors] = React.useState('');
    let [publishedYear, setPublishedYear] = React.useState();
    let [imageUrl, setImageUrl] = React.useState('');
    let [description, setDescription] = React.useState('');

    let [errorISBN, setErrorISBN] = React.useState(null);
    let [errorTitle, setErrorTitle] = React.useState(null);
    let [errorAuthors, setErrorAuthors] = React.useState(null);
    let [errorPublishedYear, setErrorPublishedYear] = React.useState(null);
    let [errorImageUrl, setErrorImageUrl] = React.useState(null);
    let [errorDescription, setErrorDescription] = React.useState(null);
    let [errorMissingFields, setErrorMissingFields] = React.useState(null);
    let [category, setCategory] = React.useState('');
    let [searchTerm, setSearchTerm] = React.useState({
        isbn: '',
        title: '',
        authors: '',
        publishedYear: 0
    });

    const [searchResults, setSearchResult] = React.useState([]);
    const [showDropdown, setShowDropdoown] = React.useState(true);

    const handeChange = (name) => {
        getGoogleBooksQuery(`{name}`, name)
            .then(res => {
                if (res.hasOwnProperty('items')) {
                    return setSearchResult(res.items);
                }
                return setSearchResult([]);
            });
    };

    const validateISBN = () => {
        if (isbn.length !== 10 && isbn.length !== 13) return setErrorISBN(true);
        setErrorISBN(false);
    };
    const validateTitle = () => {
        if (title.length < 2) return setErrorTitle(true);
        setErrorTitle(false);
    };
    const validateAuthors = () => {
        if (authors.length < 2) return setErrorAuthors(true);
        setErrorAuthors(false);
    };

    const validatePublishedYear = () => {
        if (publishedYear.toString().length !== 4 && publishedYear < 1000)
            return setErrorPublishedYear(true);
        setErrorPublishedYear(false);
    };

    const validateImageURL = () => {
        if (!imageUrl) return setErrorImageUrl(false);
    };

    const validateDescription = () => {
        if (!description) return setErrorDescription(false);
    };


    const handleAddBook = async e => {
        e.preventDefault();
        const book = { isbn, title, authors, publishedYear, imageUrl, description };
        if (isbn === 0 || (isbn.length !== 10 && isbn.length !== 13) || title === '' || authors === '' || publishedYear === 0) {
            return setErrorMissingFields(false);
        }

        addBookForm(book);

    };

    return (
        <form className="addBookForm" onSubmit={handleAddBook}>
            <Form.Field className={errorISBN ? 'errorElementRegistration' : null}>
                <Label className="itemLabel" htmlFor="formISBN">ISBN: </Label>
                <div className="searchBar">
                    <Input
                        type="number"
                        id="formISBN"
                        onBlur={validateISBN}
                        onChange={(e, data) => {
                            setISBN(data.value);
                            setShowDropdoown(true);
                            data.value.length > 8 && getGoogleBooksQuery('isbn', data.value)
                                .then(res => {
                                    if (res.hasOwnProperty('items')) {
                                        console.log(res.items);
                                        setSearchResult(res.items);
                                    } else setSearchResult([]);
                                });
                        }}
                    />
                    <div>
                        {showDropdown && isbn.length > 9 ? searchResults.map((book, i) => {
                            console.log(searchResults);
                            return (<div className="dropdownItem" key={i}
                                         onClick={() => {
                                             setTitle(book.volumeInfo.title);
                                             setAuthors(book.volumeInfo.authors.join(', '));
                                             setPublishedYear(book.volumeInfo.publishedDate.split('-')[0]);
                                             setShowDropdoown(false);
                                         }}>{book.volumeInfo.title}</div>);
                        }) : ''}
                    </div>
                </div>
                <ErrorMessage
                    error={errorISBN}
                    message={'ISBN powinien mieć 10 lub 13 znaków'}
                />
            </Form.Field>
            <Form.Field className={errorTitle ? 'errorElementRegistration' : null}>
                <Label htmlFor="formTitle">Tytuł: </Label>
                <Input
                    type="text"
                    id="formTitle"
                    onChange={(e, data) => setTitle(data.value)}
                    onBlur={validateTitle}
                    value={title}
                />
                <ErrorMessage
                    error={errorTitle}
                    message={'Podaj poprawny tytuł książki'}
                />
            </Form.Field>
            <Form.Field className={errorAuthors ? 'errorElementRegistration' : null}>
                <Label htmlFor="formAuthors">Autorzy (po przecinku): </Label>
                <Input
                    type="text"
                    id="formAuthors"
                    onChange={(e, data) => setAuthors(data.value)}
                    onBlur={validateAuthors}
                    value={authors}
                />
                <ErrorMessage
                    error={errorAuthors}
                    message={'Podaj poprawnie autora/autorów'}
                />
            </Form.Field>
            <Form.Field
                className={errorPublishedYear ? 'errorElementRegistration' : null}
            >
                <Label htmlFor="publishedYear">Rok publikacji: </Label>
                <Input
                    type="number"
                    id="formPublishedYear"
                    onBlur={validatePublishedYear}
                    onChange={(e, data) => setPublishedYear(data.value)}
                    value={publishedYear}
                />
                <ErrorMessage
                    error={errorPublishedYear}
                    message={'Rok publikacji powinien mieć 4 cyfry'}
                />
            </Form.Field>
            <Form.Field
                className={errorDescription ? 'errorElementRegistration' : null}
            >
                <Label htmlFor="formCategory">Kategoria: </Label>
                <Select placeholder='select category' options={categories}
                        onChange={(e, data) => setCategory(data.value)} value={category}/>
            </Form.Field>

            <Form.Field className={errorImageUrl ? 'errorElementRegistration' : null}>
                <Label htmlFor="formImageURL">URL obrazka: </Label>
                <Input
                    type="url"
                    id="formImageURL"
                    onChange={(e, data) => setImageUrl(data.value)}
                    onBlur={validateImageURL}
                />
                <ErrorMessage
                    error={errorImageUrl}
                    message={'Podaj poprawnie adres obrazka'}
                />
            </Form.Field>
            <Form.Field
                className={errorDescription ? 'errorElementRegistration' : null}
            >
                <Label htmlFor="formDescription">Opis: </Label>
                <Input
                    type="text"
                    id="formDescription"
                    onChange={(e, data) => setDescription(data.value)}
                    onBlur={validateDescription}
                />
                <ErrorMessage
                    error={errorDescription}
                    message={'Podaj poprawnie opis książki'}
                />
            </Form.Field>

            <ButtonBasic content="Prześlij" handleClick={handleAddBook}/>
        </form>
    );
};

export default AddBookForm;
