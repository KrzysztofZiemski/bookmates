import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect
} from "react-router-dom";

import WelcomePage from "./modules/pages/welcomePage";
import DashboardPage from "./modules/pages/dashboardPage";
import RegistrationPage from "./modules/pages/registrationPage";
import BookPage from "./modules/pages/bookPage";
import UserPage from "./modules/pages/userPage";
import ErrorPage from "./modules/pages/errorPage";

//do zrobienia rejestracja logowanie front i back

//nastepnie

//dodawanie ksiazki  //profil zalogowanego uzytkownika// profil oglądanego użytkownika
function App() {
  //header zrobić warunkowo w zależności od ścierzki wyświetglać lub nie za pomocą useRouteMatch.

  //po zalogowaniu się w loggedUser są zapisywane podstawowe dane użytkownika(można dać inne dane potrzebne) i następuje przeładowanie path na dashboard
  let [loggedUser, setLoginUser] = React.useState(null)
  return (
    <Router>
      <header>
        <Link to={"/"}> welcomePage</Link>
        <Link to={"/registration"}>registration</Link>
      </header>
      <main>
        <Switch>
          <Route exact path="/">
            {loggedUser ? <Redirect to="/dashboard" /> : <WelcomePage setLoginUser={setLoginUser} />}

          </Route>
          <Route path="/dashboard">
            <DashboardPage></DashboardPage>
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
          <Route path="/profile">
            <></>
            {
              //do uzupelnienia profil zalogowanego
            }
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
