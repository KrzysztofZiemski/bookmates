import React from 'react';
import { UserBookList } from './userBookList';

const Dashboard = (props) => {
    const { loggedUser: { id } } = props;


    return (
        <div>
            <UserBookList id={id} />
        </div>
    );
};


export default Dashboard;