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

  const logout = () => {
    deleteCookie("accessToken");
    setLoginUser(null);
  }

  // TODO: hamburger menu

  return (
    <Menu className="navbar">
      <Container>
        <Menu.Item as={Link} to={"/"} active className="logo">
          BookMates
        </Menu.Item>
        <Menu.Item as={Link} to={"/profile"}>
          profile
        </Menu.Item>
        <Menu.Item as={Link} to={"/dashboard"}>
          dashboard
        </Menu.Item>
        <Menu.Item as={Link} to={"/addbook"}>
          dodaj książkę
        </Menu.Item>
        <Menu.Item position='right'>
          <ButtonBasic content="Wyloguj" handleClick={logout} />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default LoggedHeader;