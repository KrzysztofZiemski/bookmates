import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import { Button } from 'semantic-ui-react';

import MainHeader from "./modules/pages/headerPage/headerUnlogged";
import LoggedHeader from "./modules/pages/headerPage/headerLogged";
import WelcomePage from "./modules/pages/welcomePage/welcomePage";
import Dashboard from "./modules/pages/dashboardPage/dashboardPage";
import RegistrationPage from "./modules/pages/registrationPage/registrationPage";
import AddBookPage from "./modules/pages/addBookPage/addBookPage";
import BookPage from "./modules/pages/bookPage/bookPage";
import UserPage from "./modules/pages/userPage/userPage";
import ErrorPage from "./modules/pages/errorPage/errorPage";
import ProfilePage from "./modules/pages/userPage/ProfilePage";
import { getCookies } from "./modules/cookies/cookies";
import { getUserDetails } from "./repos/user";

function App() {
  let [loggedUser, setLoginUser] = useState(null);
  //isLoading - póki się nie załaduje, ma się kręcić kółeczko

  useEffect(() => {
    getUserDetails(getCookies().accessToken)
    .then(user => { setLoginUser(user); console.log(user) })
  }, []);

  //header zrobić warunkowo w zależności od ścieżki wyświetlać lub nie za pomocą useRouteMatch.
  //sprawdzenie czy jest accessToken
  //po zalogowaniu się w loggedUser są zapisywane podstawowe dane użytkownika(można dać inne dane potrzebne) i następuje przeładowanie path na dashboard

  return (
    <Router>
      <header className="headerUnlogged">
        {loggedUser ? <LoggedHeader loggedUser={loggedUser} setLoginUser={setLoginUser} /> : <MainHeader setLoginUser={setLoginUser} />}
      </header>
      <main>
        <Switch>
          <Route exact path="/">
            <WelcomePage />
          </Route>
          <Route path="/dashboard">
            {!loggedUser ? <Redirect to="/" /> : <Dashboard />}
          </Route>
          <Route path="/registration">
            <RegistrationPage></RegistrationPage>
          </Route>
          <Route path="/addbook">
            {!loggedUser ? <Redirect to="/" /> : <AddBookPage />}
          </Route>
          <Route path="/book">
            <BookPage></BookPage>
          </Route>
          <Route path="/user">
            <UserPage></UserPage>
          </Route>
          <Route path="/profile/">
            {!loggedUser ? <Redirect to="/" /> : <ProfilePage loggedUser={loggedUser} />}
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