import React from "react";
import { Link } from "react-router-dom";

const LoggedHeader = (props) => {
  const { loggedUser } = props;
  console.log(loggedUser);

  return (
    <div>
    <Link to={"/"}> welcomePage</Link>
    <Link to={"/profile"}>profile</Link>
    </div>);
};

export default LoggedHeader;