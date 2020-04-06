import React, { useEffect, useState } from 'react';
// import { UserBookCard } from './userBookCard';
import { getAllBooks, deleteUserBook } from './../../../repos/user';
import { FilterBooks } from '../../FilterBooks/FilterBooks';
import OptionFilterBook from '../../FilterBooks/OptionFilterBook/OptionFilterBook';
import searchBooks from '../../searchBooks/searchBooks';
import SearchInput from '../../SearchInput/SearchInput';


export const UserBookList = ({ id }) => {
    let [userBooks, setUserBooks] = useState([]);
    let [search, setSearch] = useState('');
    let [filter, setFilter] = useState('category');
    useEffect(() => {
        if (!id) return
        getAllBooks(id)
            .then(res => setUserBooks(res))
            .catch(err => console.log(err));
        return getAllBooks
    }, [id]);

    return (
        <>
            <div className="panelBooks">
                <OptionFilterBook setFilter={setFilter} value={filter} />
                <SearchInput setValue={setSearch} />
            </div>
            <FilterBooks books={search.length > 2 ? searchBooks(search, userBooks) : userBooks} filterBy={filter} />
        </>
    );
};


