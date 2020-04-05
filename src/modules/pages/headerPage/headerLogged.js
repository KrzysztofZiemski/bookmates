import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ButtonBasic } from '../../Button/Button';
import { deleteCookie } from '../../cookies/cookies';
import {
    Container,
    Menu
} from 'semantic-ui-react';

import './header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AddBookSearch } from '../addBookPage/addBookSearch/AddBookSearch';
import getGoogleBooks from '../../../utils/googleBooksApi';
import { addBook } from '../../../repos/book';

const LoggedHeader = (props) => {
    const [searchClicked, setSearchClicked] = useState(false);

    const { setLoginUser, toggleMenu, loggedUser } = props;

    let [books, setBooks] = React.useState([]);
    let [searchField, setSearchField] = React.useState('');
    let [sort, setSort] = React.useState('');

    const handleChange = (e) => {
        setSearchField(e.target.value);
        if (searchField.length < 1) return;
        getGoogleBooks(searchField)
            .then(res => {
                if (res.status !== 200) throw new Error(res.status);
                return res.json();
            })
            .then(res => {
                setBooks(res);
                // Inserting results from Google Api to Postgres
                res.map(b => {
                    addBook({
                        title: escape(b.title),
                        imageUrl: b.imageLinks.thumbnail,
                        authors: b.authors.join(', '),
                        publishedYear: parseInt(b.publishedDate.split('-')[0]),
                        description: escape(b.description),
                        isbn: b.industryIdentifiers[0].identifier,
                        category: b.hasOwnProperty('categories') ? b.categories : []
                    });
                });
            });
    };


    const logout = () => {
        deleteCookie('accessToken');
        setLoginUser(false);
    };

    const handleClick = () => {
        setSearchClicked(!searchClicked);
        setBooks([]);
    };

    // TODO: hamburger menu

    return (
        <Menu className="navbar">
            <button className="close" onClick={toggleMenu}><FontAwesomeIcon icon={faTimes}/></button>
            <Container>
                <Menu.Item as={Link} to={'/'} active className="logo">
                    BookMates
                </Menu.Item>
                <Menu.Item as={Link} to={'/profile'}>
                    Profile
                </Menu.Item>
                <Menu.Item as={Link} to={'/dashboard'}>
                    Biblioteczka
                </Menu.Item>
                <Menu.Item as={Link} to={'/addbook'}>
                    Dodaj książkę
                </Menu.Item>
                <Menu.Item as={Link} to={'/mates'}>
                    Znajomi
                </Menu.Item>
                <Menu.Item className="searchButton">
                    {!searchClicked ? <FontAwesomeIcon className='searchIcon' icon={faSearch} onClick={handleClick}/> :
                        <div className="searchField">{searchClicked &&
                        <input className="searchInput" type='search' onBlur={() => {
                            setTimeout(() => {
                                handleClick();
                            }, 300);
                        }} autoFocus
                               onChange={(e) => handleChange(e)}/>}</div>}
                </Menu.Item>
                {searchClicked &&
                <div className="dropdownListContainer">
                    {books.map((book, i) => {
                        return (<Link to={`/book/${book.industryIdentifiers[0].identifier}`} className="dropdownItem"
                                      key={i}>{book.title}</Link>);
                    })}
                </div>}

                <Menu.Item position='right'>
                    <ButtonBasic content="Wyloguj" handleClick={logout}/>
                </Menu.Item>
            </Container>
        </Menu>
    );
};

export default LoggedHeader;
