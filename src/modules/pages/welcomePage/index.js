import React from "react";
import { auth } from '../../../repos/auth'
const WelcomePage = () => {

  let [password, setPassword] = React.useState("");
  let [login, setLogin] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    auth({ login, password })
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor="login">Login</label><input type="text" id="login" onChange={(e) => setLogin(e.target.value)} />
        <label htmlFor="password">Hasło</label><input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Zaloguj</button>
      </form>
    </div>);
};

export default WelcomePage;
