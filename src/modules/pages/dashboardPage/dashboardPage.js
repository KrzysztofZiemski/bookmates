import React from 'react';
import { UserBookList } from './userBookList';

const Dashboard = ({ loggedUser: { id } }) => {

    return (
        <div>
            <UserBookList id={id}/>
        </div>
    );
};


export default Dashboard;
