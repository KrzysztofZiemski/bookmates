import React, { useState } from "react";
import "./welcomePage.scss";
import { ButtonBasic } from "./../../Button/Button";
import { Redirect } from "react-router-dom";

const WelcomePage = (props) => {
  const { loggedUser } = props;
  const [redirect, setRedirect] = useState(false);

  const linkToRegistration = () => {
      setRedirect(true);
  }
  const registationButton = () => {
    if (loggedUser) return '';
    if (redirect) return <Redirect to='/registration'/>;
    return <ButtonBasic className="joinBtn" content="dołącz do społeczności" handleClick={linkToRegistration} />;
  }
 
  return (
    <div className="welcomePage">
      <div className="wrapper">
        <h1 className="logo">BookMates</h1>
        <p className="companyMessage">książki łączą ludzi</p>
        { registationButton() }
      </div>
    </div>
  );
};

export default WelcomePage;