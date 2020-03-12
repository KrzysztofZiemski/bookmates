import React from "react";
import { auth } from '../../../repos/user';
import { setCookie } from '../../cookies/cookies';
import { Link } from "react-router-dom";
import { ButtonBasic } from "../../Button/Button";
import { Container, Menu } from 'semantic-ui-react'
import { ErrorMessage } from '../../ErrorMessage/ErrorMessage';
import { Loader } from '../../Loader/Loader';

const MainHeader = (props) => {
  const { setLoginUser } = props;
  let [password, setPassword] = React.useState("");
  let [mail, setMail] = React.useState("");
  let [errorMessage, setErrorMessage] = React.useState(null);
  let [waiting, setWaiting] = React.useState(false);

  const closeError = () => {
    setErrorMessage(null)
  }
  const handleLogin = (e) => {
    e.preventDefault();
    setWaiting(true)
    auth({ mail, password })
      .then(user => {
        setWaiting(false);
        setCookie(user.token);
        setLoginUser(user);

      })
      .catch(err => {
        setWaiting(false);
        if (err.message === '401') return setErrorMessage('Niepoprawny login lub hasło');
        if (err.message === '404') return setErrorMessage('Niepoprawny login');
        setErrorMessage('Wystąpił problem logowania. Spróbuj jeszcze raz. Jeżeli problem nie ustąpi skontaktuj się z administratorem');
      });
  }

  return (
    <Menu className="navbar" >
      <Container>
        <Menu.Item as={Link} to={"/"} className="logo" active>
          BookMates
        </Menu.Item>
        <Menu.Item as={Link} to={"/registration"}>
          registration
        </Menu.Item>
        <Menu.Item position='right'>
          <form onSubmit={handleLogin}>
            <label htmlFor="mail">E-mail </label><input type="text" id="mail" onChange={(e) => setMail(e.target.value)} />
            <label htmlFor="password">Hasło </label><input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
            <ButtonBasic content="Zaloguj" />
          </form>
        </Menu.Item>
      </Container>
      {errorMessage === null ? null : <ErrorMessage closeError={closeError} message={errorMessage} />}

      {waiting ? <Loader /> : null}
    </Menu>
  );
};

export default MainHeader;