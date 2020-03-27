import React from 'react';
import './Mates.scss';
import { getSuggestionMates, deleteMate } from '../../../repos/user';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import { ButtonBasic } from '../../Button/Button';
import { setCookie, getCookies } from '../../cookies/cookies';

const Mates = ({ loggedUser, refreshUser }) => {
    let [suggestionMates, setSuggestionMates] = React.useState([]);

    const setSugestionMatesList = () => {
        let sugestionMates = getCookies().sugestionMates;
        if (sugestionMates) {
            setSuggestionMates(JSON.parse(sugestionMates))
        } else {
            getSuggestionMates().then(users => {
                const usersList = users.map(user => {
                    const { id, email, name } = user;
                    return { id, email, name };
                })
                setCookie(JSON.stringify(usersList), 'sugestionMates');
                setSuggestionMates(usersList);
            })
        }
    }

    const handleDeleteMate = (mate) => {
        deleteMate(mate.id).then(response => {
            refreshUser();
            //todo zrobić usunięcie znajomego z pobranych danych zalogowanego

        })
    }

    React.useEffect(() => {
        setSugestionMatesList();
    }, [])



    const matesList = !loggedUser ? null : loggedUser.mates.map(mate => {
        //TODO usunąć match random, po tym jak już będzie walidacja z uniemożliwieniem dodania tego samego znajomego
        return (
            <li key={mate.id + Math.random()} className="mate">
                <List.Item as={Link} to={`/user/${mate.id}`}>
                    {mate.name}
                </List.Item>
                <ButtonBasic handleClick={() => handleDeleteMate(mate)} content="Usuń" />
            </li>
        )
    })

    const suggestionMateList = suggestionMates.map(user => {
        //TODO usunąć match random, po tym jak już będzie walidacja z uniemożliwieniem dodania tego samego znajomego
        return (
            <li key={user.id + Math.random()} className="suggestionMate">
                <List.Item as={Link} to={`/user/${user.id}`}>
                    {user.name}
                </List.Item>
            </li>
        )
    })

    return (

        <section className="matesPage">
            <main className="mateList">
                <h1>Znajomi</h1>
                <List>{matesList}</List>
            </main>
            <aside className="suggestionMateList">
                <h1>Propozycję</h1>
                <List> {suggestionMateList}</List>
            </aside>

        </section>
    )
}

export default Mates;