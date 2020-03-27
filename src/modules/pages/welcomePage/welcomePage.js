import React from "react";
import "./welcomePage.scss";
import { ButtonBasic } from "./../../Button/Button";
import { auth } from '../../../repos/user';
import { setCookie } from '../../cookies/cookies';


const WelcomePage = (props) => {
 
  return (
    <div className="welcomePage">
      <div className="wrapper">
        <h1 className="logo">BookMates</h1>
        <p className="companyMessage">książki łączą ludzi</p>
        <ButtonBasic className="joinBtn" content="dołącz do społeczności" />
      </div>
    </div>
  );
};

export default WelcomePage;
