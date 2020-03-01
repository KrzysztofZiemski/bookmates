import React from "react";
import {UserPage} from "../userPage/userPage.js"

export const UserList = props => {
  return (
    <div className="list">
      {props.users.map((user, i) => (
        <UserPage key={i} name={user.name} country={user.country} city={user.city} gender={user.gender} />
      ))}
    </div>
  );
};

export default UserList;
