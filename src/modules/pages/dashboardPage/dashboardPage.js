import React from 'react';
import { UserBookList } from './userBookList';
import './dashboardPage.scss';

const Dashboard = ({ loggedUser }) => {
    const output = loggedUser ? <UserBookList id={loggedUser.id} /> : null;

    return (
        <div className="dashboardPage">
            <h1>Biblioteczka</h1>
            {output}
        </div>
    );
};


export default Dashboard;
