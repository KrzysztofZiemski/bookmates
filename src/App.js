import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import { Button } from 'semantic-ui-react';

import MainHeader from "./modules/pages/headerPage/headerUnlogged";
import LoggedHeader from "./modules/pages/headerPage/headerLogged";
import WelcomePage from "./modules/pages/welcomePage/welcomePage";
import DashboardPage from "./modules/pages/dashboardPage/dashboardPage";
import RegistrationPage from "./modules/pages/registrationPage/registrationPage";
import BookPage from "./modules/pages/bookPage/bookPage";
import UserPage from "./modules/pages/userPage/userPage";
import ErrorPage from "./modules/pages/errorPage/errorPage";
import ProfilePage from "./modules/pages/userPage/userPage";
import { getCookies } from "./modules/cookies/cookies";
import { getUserDetails} from "./repos/user"

//do zrobienia rejestracja logowanie front i back

//nastepnie

//dodawanie ksiazki  //profil zalogowanego uzytkownika// profil oglądanego użytkownika
function App() {
  let [loggedUser, setLoginUser] = useState(null);

  useEffect(() => {
    getUserDetails(getCookies().accessToken).then(user => {setLoginUser(user); console.log(user)})
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
            {!loggedUser ? <Redirect to="/" /> : <DashboardPage />}
          </Route>
          <Route path="/registration">
            <RegistrationPage></RegistrationPage>
          </Route>
          <Route path="/book">
            <BookPage></BookPage>
          </Route>
          <Route path="/user">
            <UserPage></UserPage>
          </Route>
          <Route path="/profile/">

            <ProfilePage loggedUser={loggedUser} />
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
