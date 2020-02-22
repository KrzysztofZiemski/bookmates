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

const UserPage = () => {
  return <div>userpage</div>
}

export default ProfilePage;