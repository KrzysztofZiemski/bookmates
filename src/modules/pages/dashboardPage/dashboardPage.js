import React from 'react';
import { UserBookList } from './userBookList';

const Dashboard = ({ loggedUser }) => {
    const output = loggedUser ? <UserBookList id={loggedUser.id} /> : null;

    return (
        <div className="dashboardPage">
            {output}
        </div>
    );
};


export default Dashboard;
