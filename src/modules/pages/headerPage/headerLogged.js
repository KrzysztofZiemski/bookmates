import React from "react";
import { Link } from "react-router-dom";
import { ButtonBasic } from "../../button";
import { deleteCookie } from "../../cookies/cookies";
import {
  Container,
  Menu
} from 'semantic-ui-react'

const LoggedHeader = (props) => {
  const { loggedUser, setLoginUser } = props;
  console.log(loggedUser);
  const logout = () => {
    deleteCookie("accessToken");
    setLoginUser(null);
  }

  // TODO: fix link cliking issues

  return (
      <Menu className="headerUnlogged">
      <Container>
        <Menu.Item as='a' active>
          <Link to={"/"} className="logo">Bookmates</Link>
        </Menu.Item>
        <Menu.Item as='a'>
          <Link to={"/profile"}>profile</Link>
        </Menu.Item>
        <Menu.Item as='a'>
          <Link to={"/dashboard"}>dashboard</Link>
        </Menu.Item>
        <Menu.Item position='right'>
            <ButtonBasic content="Wyloguj" handleClick={logout} />
        </Menu.Item>
      </Container>
    </Menu>
    );
};

export default LoggedHeader;