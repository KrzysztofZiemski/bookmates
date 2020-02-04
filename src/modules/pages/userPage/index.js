import React from "react";
import { getUser } from '../../../repos/user';
import { getCookies } from "../../../modules/cookies";

const getLoggedUser = () => {
  let accessToken = getCookies().accessToken;
  return fetch(`localhost:3010/user/details`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${accessToken}`
      }
  });
}

const ProfilePage = () => {
  let user = getLoggedUser().then((response) => response.json());
  let userId = user.id;
  return (
  <div>
    <p>user id is: `${userId}`</p>
  </div>
  );
};

const UserPage = () => {
  return <div>userpage</div>
}

export default ProfilePage;