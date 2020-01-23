import React from "react";
import { auth } from '../../../repos/auth';
import { setCookie } from '../../cookies';


const WelcomePage = (props) => {
  const { setLoginUser } = props;
  let [password, setPassword] = React.useState("");
  let [mail, setMail] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    auth({ mail, password }).then(response => {
      if (response.status === 200) return response.json();
      throw new Error();
    }).then(user => {
      setCookie(user.token);
      setLoginUser(user)
    })
      .catch(err => console.log(err))
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor="mail">Mail</label><input type="text" id="login" onChange={(e) => setMail(e.target.value)} />
        <label htmlFor="password">Hasło</label><input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Zaloguj</button>
      </form>
    </div>);
};

export default WelcomePage;
