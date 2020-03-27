import React from 'react';
import { UserBookList } from './userBookList';

const Dashboard = ({ loggedUser }) => {
    console.log(loggedUser)
    const output = loggedUser ? <UserBookList id={loggedUser.id} /> : null;

    return (
        <div>
            {output}
        </div>
    );
};


export default Dashboard;
