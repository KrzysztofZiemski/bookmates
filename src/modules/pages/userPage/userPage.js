import React, { useState } from "react";
import { getUser } from '../../../repos/user';


const UserPage = (props) => {
  const {unloggedUser: {name, country, city, gender, userBooks}} = props;

  return <div>
    <p>Użytkownik: {name} </p>
    <p>Kraj: {country} </p>
    <p>Miasto: {city} </p>
    <p>Płeć: {gender} </p> 
    <p>Półka z książkami: {userBooks}   </p>
    <button>Dodaj użytkownika do Bookmates  </button>
    
    </div>
}

export default UserPage;