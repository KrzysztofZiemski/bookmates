import React, { useState } from "react";
import { getUser } from '../../../repos/user';
import { getCookies } from "../../cookies/cookies";

// const getLoggedUser = () => {
//   let accessToken = getCookies().accessToken;
//   fetch('http://localhost:3010/user/details', {
//       method: 'GET',
//       headers: {
//           'Authorization': `Bearer ${accessToken}`
//       }
//   })
// }

const ProfilePage = (props) => {

  console.log(props)
  return (
  <div>
    <p>user id is: </p>
  </div>
  );
};

const UserPage = () => {
  return <div>userpage</div>
}

export default ProfilePage;