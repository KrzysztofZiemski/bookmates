import React from 'react';
import { Link } from 'react-router-dom';
import './userBookCard.scss';

export const UserBookCard = props => {
    return (
        <div className="card-container">

            <Link to={`/book/${props.id}`}>
                <img src={props.image} alt=""/>
                <div className="desc">
                    <h2>{unescape(props.title)}</h2>
                    <h3>{props.author}</h3>
                </div>

            </Link>

            <button onClick={props.handleBookDelete}>Usuń z półki</button>
        </div>
    );
};
