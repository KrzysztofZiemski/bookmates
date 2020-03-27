import React from 'react';
import { UserBookList } from './userBookList';
import { FilterBooks } from '../../FilterBooks/FilterBooks';

const Dashboard = ({ loggedUser }) => {
    const output = loggedUser ? <UserBookList id={loggedUser.id} /> : null;

    return (
        <div className="dashboardPage">
            {loggedUser === null ? null : <FilterBooks books={loggedUser.books} filterBy={'authors'} />}
            {/* {output} */}
        </div>
    );
};


export default Dashboard;
