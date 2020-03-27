import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, loggedUser, ...rest }) => (
    <Route {...rest}
           render={props =>
               !loggedUser ? <Redirect to='/login'/> : <Component {...props}/>
           }
    />
);

export default PrivateRoute;
