import React from "react";
import { getPublicUser, addMate } from '../../../repos/user';
import { Loader } from '../../Loader/Loader';
import { ErrorMessage } from '../../ErrorMessage/ErrorMessage';
import { ButtonBasic } from '../../Button/Button';
import BooksSliders from './booksSliders';
import maleAvatar from '../../assets/male.png';
import femaleAvatar from '../../assets/female.png';
import nogenderAvatar from '../../assets/nogender.png';
import './userPage.scss';

const UserPage = (props) => {
  let [publicUser, setPublicUser] = React.useState(null);
  let [waiting, setWaiting] = React.useState(false);
  let [error, setError] = React.useState(false);
  let { loggedUser, match, refreshUser } = props;

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
      .then(user => setPublicUser(user))
      .catch(err => {
        setWaiting(false)
        setError(<ErrorMessage message="Nie udało się pobrać użytkownika. Sprawdź poprawność adresu URL" closeError={closeError} />)
      })
  };

  const handleAddMate = () => {
    const { id, email, name } = publicUser;
    setWaiting(<Loader />)
    addMate({ id, email, name })
      .then(response => {
        setWaiting(false)
        if (response.status === 400) setError(<ErrorMessage message="Użytkownik już był dodawany do grupy znajomych" closeError={closeError} />);
        if (response.status === 200) {
          alert('Dodano do znajomych');
          refreshUser();
        };
      })
      .catch(err => {
        setWaiting(false);
      })
  };
  const avatar = () => {
    switch (publicUser.gender) {
      case 'man':
        return maleAvatar;
      case 'woman':
        return femaleAvatar;
      default:
        return nogenderAvatar
    }
  }

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
          <div className="avatar">
            <img src={avatar()} alt={`${publicUser.name} avatar`} />
          </div>
          <div>
            <div className="userData-element">
              <p>Nazwa użytkownika</p>
              <p>{publicUser.name}</p>
            </div>
            <div className="userData-element">
              <p>Adres mailowy</p>
              <p>{publicUser.email}</p>
            </div>
            <div className="userData-element">
              <p>Kraj zamieszkania</p>
              <p>{publicUser.country}</p>
            </div>
            <div className="userData-element">
              <p>Miasto zamieszkania</p>
              <p>{publicUser.city}</p>
            </div>
            {loggedUser ? <ButtonBasic handleClick={handleAddMate} content='Dodaj do znajomych' /> : null}
          </div>
        </div>
        <BooksSliders publicUser={publicUser} />
      </section>
      }
    </>
  )
};

export default UserPage;
