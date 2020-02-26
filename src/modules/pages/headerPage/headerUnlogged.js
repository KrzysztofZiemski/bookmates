import React from "react";
import { auth } from '../../../repos/user';
import { setCookie } from '../../cookies/cookies';
import { Link } from "react-router-dom";
import { ButtonBasic } from "../../button";
import { Container, Menu } from 'semantic-ui-react'

const MainHeader = (props) => {
  const { setLoginUser } = props;
  let [password, setPassword] = React.useState("");
  let [name, setName] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    auth({ name, password })
      .then(user => {
        setCookie(user.token);
        setLoginUser(user)
      })
      .catch(err => console.log(err));
  }

  return (
    <Menu className="navbar">
      <Container>
        <Menu.Item as={Link} to={"/"} className="logo" active>
          BookMates
        </Menu.Item>
        <Menu.Item as={Link} to={"/registration"}>
          registration
        </Menu.Item>
        <Menu.Item position='right'>
          <form onSubmit={handleLogin}>
            <label htmlFor="name">Nazwa użytkownika</label><input type="text" id="name" onChange={(e) => setName(e.target.value)} />
            <label htmlFor="password">Hasło</label><input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
            <ButtonBasic content="Zaloguj" />
          </form>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default MainHeader;