import React, { useEffect, useState } from 'react';
import "./usersSearchBar.scss";
import { Input } from 'semantic-ui-react';
import { getAllUsers } from '../../../repos/user';
import { Link } from "react-router-dom";

const UsersSearchBar = () => {

    const [ searchTerm, setSearchTerm ] = useState("");
    const [ allUsers, setAllUsers ] = useState([]);
    const [ searchResults, setSearchResults ] = useState([]);

    const loadUsers = () => {
        getAllUsers()
            .then(response => response.json()
                .then(allUsers => {
                    setAllUsers(allUsers);
                })
            )
    };

    loadUsers();

    useEffect(() => {
        const results = allUsers.filter(user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm]);

    const handleChange = event => {
       setSearchTerm(event.target.value);
    };

    return (
        <div className="searchBar">
            <Input
                placeholder='Szukaj użytkownika'
                value={searchTerm}
                onChange={handleChange}
            />
            <div>
                {searchTerm.length > 2 ? searchResults.map(user => (<Link className="dropdownItem"to={`user/${user.id}`}><span>{user.name}</span></Link>)) : ''}
            </div>
        </div>
    )
}

export { UsersSearchBar };