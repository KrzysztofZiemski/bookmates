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
import getGoogleBooks from '../../../utils/googleBooksApi';
import { addBook } from '../../../repos/book';

const LoggedHeader = (props) => {
    const [searchClicked, setSearchClicked] = useState(false);

    const { setLoginUser, toggleMenu } = props;

    let [books, setBooks] = React.useState([]);

    const handleChange = (e) => {
        if (e.target.value.length < 2) return;
        getGoogleBooks(e.target.value)
            .then(res => {
                if (res.status !== 200) throw new Error(res.status);
                return res.json();
            })
            .catch(err => console.log(err))
            .then(res => {
                setBooks(res);
                // Inserting results from Google Api to Postgres
                res && res.map(b => {
                    console.log('sssss', b)
                    return addBook({
                        title: escape(b.title),
                        imageUrl: b.imageLinks.thumbnail,
                        authors: b.authors.join(', '),
                        publishedYear: parseInt(b.publishedDate.split('-')[0]),
                        description: escape(b.description),
                        isbn: b.industryIdentifiers[0].identifier,
                        category: b.hasOwnProperty('categories') ? b.categories : ['Brak']
                    });
                });
            });
    };

    const logout = () => {
        deleteCookie('accessToken');
        setLoginUser(false);
    };

    const handleClick = () => {
        setSearchClicked(true);
        setBooks([]);
    };

    // TODO: hamburger menu

    return (
        <Menu className="navbar">
            <button className="close" onClick={toggleMenu}><FontAwesomeIcon icon={faTimes} /></button>
            <Container>
                <Menu.Item as={Link} to={'/'} active className="logo" onClick={toggleMenu}>
                    BookMates
                </Menu.Item>
                <Menu.Item as={Link} to={'/profile'} onClick={toggleMenu}>
                    Profil
                </Menu.Item>
                <Menu.Item as={Link} to={'/dashboard'} onClick={toggleMenu}>
                    Biblioteczka
                </Menu.Item>
                <Menu.Item as={Link} to={'/addbook'} onClick={toggleMenu}>
                    Dodaj książkę
                </Menu.Item>
                <Menu.Item as={Link} to={'/mates'} onClick={toggleMenu}>
                    Znajomi
                </Menu.Item>
                <Menu.Item className="searchButton" onClick={handleClick}>
                    {!searchClicked ? <FontAwesomeIcon className='searchIcon' icon={faSearch} /> :
                        <div className="searchField">{searchClicked &&
                            <input className="searchInput" type='search' onBlur={() => {
                                setTimeout(() => {
                                    setSearchClicked(false);
                                }, 300);
                            }} autoFocus
                                onChange={(e) => handleChange(e)} />}
                        </div>}
                </Menu.Item>
                {searchClicked &&
                    <div className="dropdownListContainer">
                        {books && books.map((book, i) => {
                            return (<Link to={`/book/${book.industryIdentifiers[0].identifier}`} className="dropdownItem"
                                key={i}>
                                <div className="bookCard">
                                    <div className="bookCardDetails">
                                        <h1>{book.title}</h1>
                                        <h2>{book.hasOwnProperty('authors') && book.authors.join(', ')}</h2>
                                        <h3>{book.publishedDate.split('-')[0]}</h3>
                                    </div>
                                    <div className="imageContainer">
                                        <img src={book.imageLinks.thumbnail} alt="" />
                                    </div>
                                </div>
                            </Link>);
                        })}
                    </div>}
                <Menu.Item position='right'>
                    <ButtonBasic content="Wyloguj" handleClick={logout} />
                </Menu.Item>
            </Container>
        </Menu>
    );
};

export default LoggedHeader;
