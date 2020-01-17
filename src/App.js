import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
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
  let isRegistrationPage = useRouteMatch("/registration");

  return (
    <Router>
      {isRegistrationPage ? null : (
        <header>
          <Link to={"/"}> welcomePage</Link>
          <Link to={"/registration"}>registration</Link>
        </header>
        //header w oddzielny moduł - warunkowo
      )}
      <main>
        <Switch>
          <Route exact path="/">
            <WelcomePage></WelcomePage>
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
