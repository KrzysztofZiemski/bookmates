import React from "react";
import { Link } from "react-router-dom";
import { ButtonBasic } from "../../button";
import { deleteCookie } from "../../cookies/cookies";


const LoggedHeader = (props) => {
  const { loggedUser, setLoginUser } = props;
  console.log(loggedUser);
  const logout = () => {
    //wyczyść cookies
    deleteCookie("accessToken");
    setLoginUser(null);
  }

  return (
    <div>
    <Link to={"/"}> welcomePage</Link>
    <Link to={"/profile"}>profile</Link>
    <ButtonBasic content="Wyloguj" handleClick={logout} />
    </div>
    );
};

export default LoggedHeader;