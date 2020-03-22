import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import MainHeader from './modules/pages/headerPage/headerUnlogged';
import LoggedHeader from './modules/pages/headerPage/headerLogged';
import WelcomePage from './modules/pages/welcomePage/welcomePage';
import Dashboard from './modules/pages/dashboardPage/dashboardPage';
import RegistrationPage from './modules/pages/registrationPage/registrationPage';
import AddBookPage from './modules/pages/addBookPage/addBookPage';
import BookPage from './modules/pages/bookPage/bookPage';
import UserPage from './modules/pages/userPage/userPage';
import ErrorPage from './modules/pages/errorPage/errorPage';
import ProfilePage from './modules/pages/profilePage/ProfilePage';
import { getCookies } from './modules/cookies/cookies';
import { getUserDetails } from './repos/user';

//TODO SWITCH HIDE MENU
function App() {
    let [loggedUser, setLoginUser] = useState(null);
    let [menuVisibility, setMenuVisibility] = useState(false);

    const toggleMenu = () => {
        console.log('dupa');
        if (!menuVisibility) return setMenuVisibility(true);
        setMenuVisibility(false);
    };
    useEffect(() => {
        getUserDetails(getCookies().accessToken).then(user => {
            setLoginUser(user);
        });
    }, []);

    return (
        <Router>
            <div className="menuBurger" onClick={toggleMenu}><FontAwesomeIcon icon={faBars} /></div>
            <header className={menuVisibility ? 'headerUnlogged show' : 'headerUnlogged'}>
                {loggedUser ?
                    <LoggedHeader loggedUser={loggedUser} setLoginUser={setLoginUser} toggleMenu={toggleMenu} /> :
                    <MainHeader setLoginUser={setLoginUser} toggleMenu={toggleMenu} />}
            </header>
            <main>
                <Switch>
                    <Route exact path="/">
                        <WelcomePage />
                    </Route>
                    <Route path="/dashboard">
                        {!loggedUser ? <Redirect to="/" /> : <Dashboard loggedUser={loggedUser} />}
                    </Route>
                    <Route path="/addbook">
                        {!loggedUser ? <Redirect to="/" /> : <AddBookPage loggedUser={loggedUser} />}
                    </Route>
                    <Route path="/registration">
                        {!loggedUser ? <RegistrationPage /> : <Redirect to="/dashboard" />}
                    </Route>
                    <Route path="/addbook">
                        {!loggedUser ? <Redirect to="/" /> : <AddBookPage loggedUser={loggedUser} />}
                    </Route>
                    <Route exact path='/book/:id' component={BookPage}>
                    </Route>
                    <Route path="/user/:id" render={(props) => <UserPage {...props} loggedUser={loggedUser} />} />
                    <Route path="/profile/">
                        {!loggedUser ? <Redirect to="/" /> :
                            <ProfilePage loggedUser={loggedUser} setLoginUser={setLoginUser} />}
                    </Route>
                    <Route>
                        <ErrorPage></ErrorPage>
                    </Route>
                </Switch>
            </main>
        </Router>
    );
}

//route można zagnieżdżać w komponentach wywoływanych przez route, aby powstawały kolejne zagnieżdżenia komponentów
export default App;
