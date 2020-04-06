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
import Mates from './modules/pages/mates/Mates';
import AddBookPage from './modules/pages/addBookPage/addBookPage';
import BookPage from './modules/pages/bookPage/bookPage';
import UserPage from './modules/pages/userPage/userPage';
import ErrorPage from './modules/pages/errorPage/errorPage';
import ProfilePage from './modules/pages/profilePage/ProfilePage';
import PrivateRoute from './modules/pages/routing/PrivateRoute';
import { getCookies } from './modules/cookies/cookies';
import { getUserDetails } from './repos/user';

const structureLoggedUser = {
    id: 0,
    email: '',
    name: '',
    country: '',
    city: '',
    postal_code: '',
    coordinates: { x: 0, y: 0 },
    gender: '',
    birth: 'RRR-MM-DD',
    books: [],
    mates: []

};

function App() {
    let [loggedUser, setLoginUser] = useState(structureLoggedUser);
    let [menuVisibility, setMenuVisibility] = useState(false);
    const toggleMenu = () => {
        console.log('dupa');
        if (!menuVisibility) return setMenuVisibility(true);
        setMenuVisibility(false);
    };
    //TODO - NIE CHCIAŁO SIĘ USTAWIAĆ setLoginUser(false) w then funkcji getUserDetails(trzeba ustawić też błąd
    // pobierania danych usera(niepoprawny token))
    const refreshUser = () => {
        if (!getCookies().accessToken) return setLoginUser(false);
        getUserDetails(getCookies().accessToken).then(user => {
            setLoginUser(user);
        }).catch(err => console.log('err'));
    };

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <Router basename='bookmates'>
            <div className="menuBurger" onClick={toggleMenu}><FontAwesomeIcon icon={faBars}/></div>
g            <div className="menuBurger" onClick={toggleMenu}><FontAwesomeIcon icon={faBars}/></div>
            <header className={menuVisibility ? 'headerUnlogged show' : 'headerUnlogged'}>
                {loggedUser ?
                    <LoggedHeader loggedUser={loggedUser} setLoginUser={setLoginUser} toggleMenu={toggleMenu}/> :
                    <MainHeader setLoginUser={setLoginUser} toggleMenu={toggleMenu}/>}
            </header>
            <main>
                <Switch>
                    <Route exact path="/">
                        <WelcomePage loggedUser={loggedUser}/>
                    </Route>
                    <Route path="/dashboard">
                        {loggedUser === false ? <Redirect to="/"/> : <Dashboard loggedUser={loggedUser}/>}
                    </Route>
                    <Route path="/addbook">
                        {loggedUser === false ? <Redirect to="/"/> : <AddBookPage loggedUser={loggedUser}/>}
                    </Route>
                    <Route path="/registration">
                        {loggedUser === false ? <RegistrationPage/> : <Redirect to="/dashboard"/>}
                    </Route>
                    <PrivateRoute exact path="/addbook/:query" component={AddBookPage}>
                    </PrivateRoute>
                    <Route path='/book/:id' render={(props) => <BookPage {...props} loggedUser={loggedUser}/>}/>
                    <Route path="/user/:id" render={(props) => <UserPage {...props} loggedUser={loggedUser}
                                                                         refreshUser={refreshUser}/>}/>
                    <Route path="/profile/">
                        {loggedUser === false ? <Redirect to="/"/> :
                            <ProfilePage loggedUser={loggedUser} setLoginUser={setLoginUser}/>}
                    </Route>
                    <Route path="/mates">
                        {loggedUser === false ? <Redirect to="/"/> :
                            <Mates loggedUser={loggedUser} refreshUser={refreshUser}/>}
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
