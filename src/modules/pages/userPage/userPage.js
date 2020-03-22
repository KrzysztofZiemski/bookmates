import React from "react";
import { useLocation } from 'react-router-dom';
import { getPublicUser, addMate } from '../../../repos/user';
import { library } from "@fortawesome/fontawesome-svg-core";

const UserPage = (props) => {
  let [publicUser, setPublicUser] = React.useState(null);
  let { loggedUser, match } = props;
  console.log(loggedUser, 'logged')
  const getUser = () => {
    const { id } = match.params;
    getPublicUser(id)
      .then(response => response.json())
      .then(user => {
        setPublicUser(user);
        console.log(publicUser);
      });
  };
  const handleAddMate = () => {
    const { id, email, name } = publicUser;

    addMate({ id, email, name })
      .then(response => console.log(response))
      .catch(err => console.log(err))
  };

  const showBooks = () => {
    return publicUser.books.map(book => {
      //TODO bookauthors may be array
      return (
        <li key={book.bookId}>
          <h3>{book.title}</h3>
          <p>{book.authors}</p>
          <p><img src={book.imageUrl} alt={`book ${book.title}`} /></p>
          <p>{book.categories}</p>
          <p>{book.publishedYear}</p>
        </li>
      )

    })

  }
  React.useEffect(() => {
    getUser();

  }, []);

  return (
    <div>
      <h1>{publicUser === null ? null : publicUser.name}</h1>
      <p>{publicUser === null ? null : publicUser.email}</p>
      <p>{publicUser === null ? null : publicUser.country}</p>
      <p>{publicUser === null ? null : publicUser.city}</p>
      {loggedUser ? <p><button onClick={handleAddMate}>Dodaj do znajomych</button></p> : null}
      {publicUser === null ? null : <div>
        <h2>Książki na półce</h2>
        <ul>
          {showBooks()}
        </ul>
      </div>}
    </div>
    // {publicUser ? <div><h1>{publicUser.name}</h1><p>{publicUser.email}</p><p>{publicUser.country}</p><p>{publicUser.city}</p><p>{publicUser.city}</p><h2>książki</h2></div> : <div></div>}
  )
};

export default UserPage;
