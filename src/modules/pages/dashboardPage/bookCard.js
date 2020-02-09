import React from 'react';

export const BookCard = props => {

    return (
        <div className="card-container">
            <img src={props.image} alt=""/>
            <div className="desc">
                <h2>{props.title}</h2>
                <h3>{props.author}</h3>
                <p>Published: {props.published === '0000' ? 'unknown' : props.published.substring(0,4)}</p>
                <button>Dodaj na półkę</button>
            </div>
        </div>
    )
}