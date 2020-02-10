import React from "react";
import { auth } from '../../../repos/user';
import { setCookie } from '../../cookies/cookies';
import { Link } from "react-router-dom";
import { ButtonBasic } from "../../button";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

const MainHeader = (props) => {
  const { setLoginUser } = props;
  let [password, setPassword] = React.useState("");
  let [mail, setMail] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    auth({ mail, password })
      .then(user => {
        setCookie(user.token);
        setLoginUser(user)
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Link className="logo" to={"/"}> BookMates</Link>
      <Link to={"/registration"}>registration</Link>
      <form onSubmit={handleLogin}>
        <label htmlFor="mail">Mail</label><input type="text" id="login" onChange={(e) => setMail(e.target.value)} />
        <label htmlFor="password">Hasło</label><input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        <ButtonBasic content="Zaloguj" />
      </form>
    </div>
  );
};

export default MainHeader;