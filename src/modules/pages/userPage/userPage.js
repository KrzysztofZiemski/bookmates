import React, { useState, Suspense } from "react";
import { getUser } from '../../../repos/user';
import { getCookies } from "../../cookies/cookies";

const ProfilePage = (props) => {
  const { loggedUser: { id, email, name, country, city, gender }} = props;

  return (
  <div>
    <p>user email is: {email} </p>
    <p>user id is: {id} </p>
    <p>user name is: {name} </p>
    <p>user country is: {country} </p>
    <p>user city is: {city} </p>
    <p>user gender is: {gender} </p>    
  </div>
  );
};

const UserPage = (props) => {
  const {unloggedUser: {id, name, country, city, gender, userBooks}} = props;

  return <div>
    <p>Użytkownik: {name} </p>
    <p>Kraj: {country} </p>
    <p>Miasto: {city} </p>
    <p>Płeć: {gender} </p> 
    <p>Półka z książkami:  </p>
    <p>Dodaj użytkownika do Bookmates  </p>
    
    </div>
}

export default ProfilePage;