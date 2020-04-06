import React from "react";
import { getPublicUser, addMate, deleteMate } from '../../../repos/user';
import { Loader } from '../../Loader/Loader';
import { ErrorMessage } from '../../ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../../successMessage/SuccessMessage';
import { ButtonBasic } from '../../Button/Button';
import { FilterBooks } from '../../FilterBooks/FilterBooks';
import OptionFilterBook from '../../FilterBooks/OptionFilterBook/OptionFilterBook';
import searchBooks from '../../searchBooks/searchBooks';
import SearchInput from '../../SearchInput/SearchInput';
import maleAvatar from '../../assets/male.png';
import femaleAvatar from '../../assets/female.png';
import nogenderAvatar from '../../assets/nogender.png';
import './userPage.scss';

const UserPage = (props) => {
  let [publicUser, setPublicUser] = React.useState(null);
  let [waiting, setWaiting] = React.useState(false);
  let [message, setMessage] = React.useState(false);
  let [filter, setFilter] = React.useState('category');
  let [search, setSearch] = React.useState('');
  let { loggedUser, match, refreshUser } = props;
  const closeMessage = () => {
    setMessage(false);
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
        setMessage(<ErrorMessage message="Nie udało się pobrać użytkownika. Sprawdź poprawność adresu URL" closeError={closeMessage} />)
      })
  };
  const handleRemoveMate = () => {
    setWaiting(<Loader />);
    deleteMate(publicUser.id).then(response => {
      setWaiting(false);
      setMessage(<SuccessMessage message="Usunięto użytkownika ze znajomych" closeError={closeMessage} />)
      refreshUser();
    })
      .catch(err => {
        setWaiting(false);
        setMessage(<ErrorMessage message="Wystąpił błąd. Jeżeli sytuacja będzie się powtarzać skontaktuj się z administratorem" closeError={closeMessage} />);
      })
  }
  const handleAddMate = () => {
    const { id, email, name } = publicUser;
    setWaiting(<Loader />)
    addMate({ id, email, name })
      .then(response => {
        setWaiting(false)
        if (response.status === 400) setMessage(<ErrorMessage message="Użytkownik już był dodawany do grupy znajomych" closeError={closeMessage} />);
        if (response.status === 200) {
          setMessage(<SuccessMessage message="Dodano użytkownika do znajomych" closeError={closeMessage} />)
          refreshUser();
        };
      })
      .catch(err => {
        setWaiting(false);
        setMessage(<ErrorMessage message="Wystąpił błąd. Jeżeli sytuacja będzie się powtarzać skontaktuj się z administratorem" closeError={closeMessage} />)
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
  const isExist = () => {
    if (!loggedUser || !publicUser) return false;
    return loggedUser.mates.find(mate => {
      if (mate.id === publicUser.id) return true;
    });
  }
  React.useEffect(() => {
    const { id } = match.params;
    if (id) getUser(id);
  }, []);

  return (
    <>
      {waiting}
      {message}

      {publicUser === null ? <section className="userPage"></section> : <section className="userPage">
        <h1>Użytkownik</h1>
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
            {loggedUser && loggedUser.id !== publicUser.id ? <ButtonBasic handleClick={isExist() ? handleRemoveMate : handleAddMate} content={isExist() ? 'Usuń ze znajomych' : 'Dodaj do znajomych'} /> : null}
          </div>
        </div>
        <h2>Biblioteczka</h2>
        <div className="panelBooks">
          <OptionFilterBook setFilter={setFilter} value={filter} />
          <SearchInput setValue={setSearch} />
        </div>
        <FilterBooks books={search.length > 2 ? searchBooks(search, publicUser.books) : publicUser.books} filterBy={filter} />
      </section>
      }
    </>
  )
};

export default UserPage;
