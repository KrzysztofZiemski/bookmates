import React from "react";
import { getPublicUser, addMate } from '../../../repos/user';
import { Loader } from '../../Loader/Loader';
import { ErrorMessage } from '../../ErrorMessage/ErrorMessage';
import Slider from '../../Slider/Slider';
import './userPage.scss';

const UserPage = (props) => {
  let [publicUser, setPublicUser] = React.useState(null);
  let [waiting, setWaiting] = React.useState(false);
  let [error, setError] = React.useState(false);
  let { loggedUser, match } = props;

  const closeError = () => {
    setError(false);
  }

  const getUser = (id) => {
    setWaiting(<Loader />)
    getPublicUser(id)
      .then(response => {
        setWaiting(false);
        if (response.status === 200) return response.json();
        throw new Error();
      })
      .then(user => {
        console.log('user', user)
        setPublicUser(user);
      })
      .catch(err => {
        setWaiting(false)
        setError(<ErrorMessage message="Nie udało się pobrać użytkownika. Sprawdź poprawność adresu URL" closeError={closeError} />)
        console.log(err)
      })
  };

  const handleAddMate = () => {
    const { id, email, name } = publicUser;
    setWaiting(<Loader />)
    addMate({ id, email, name })
      .then(response => {
        setWaiting(false)
        console.log(response)
      })
      .catch(err => {
        setWaiting(false);
      })
  };


  React.useEffect(() => {
    const { id } = match.params;
    if (id) getUser(id);
  }, []);

  return (
    <>
      {waiting}
      {error}
      {publicUser === null ? <section className="userPage"></section> : <section className="userPage">
        <div className="userData">
          <h1>{publicUser.name}</h1>
          <p>{publicUser.email}</p>
          <p>{publicUser.country}</p>
          <p>{publicUser.city}</p>
          {loggedUser ? <p><button onClick={handleAddMate}>Dodaj do znajomych</button></p> : null}
        </div>
        <div className="userBooksContainer">
          <h2>Książki na półce</h2>
          <div className="slider-container">
            <Slider content={publicUser.books}></Slider>
          </div>
        </div>
      </section>
      }
    </>
  )
};

export default UserPage;
