import React from 'react';

export const UserBookCard = props => {

    return (
        <div className="card-container">
            <img src={props.image} alt=""/>
            <div className="desc">
                <h2>{props.title}</h2>
                <h3>{props.author}</h3>
                <button>Usuń z półki</button>
            </div>
        </div>
    );
};