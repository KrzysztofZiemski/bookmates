import React, { useState } from "react";
import { getUser } from '../../../repos/user';



export const UserPage = props => {
  const {unloggedUser: {name, country, city, gender}} = props;

  return (
      <div className="card-container">
          {/* <img src={props.image} alt=""/> <-- tu avatar*/}
          <div className="desc">
              <h2>{props.name}</h2>
              <h3>{props.country}</h3>
              <h3>{props.city}</h3>
              <h3>{props.gender}</h3>
              <h4>Półka z książkami</h4>
              <button>Dodaj użytkownika do Bookmates </button>
          </div>
      </div>
  )
};

export default UserPage;