import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const BookCard = props => {


    return (
        <div className="card-container">
            <Link to={`/book/${props.id}`}>

                <img src={props.image} alt=""/>
                <div className="desc">
                    <h2>{props.title}</h2>
                    <h3>{props.author}</h3>
                    <p>Published: {props.published === '0000' ? 'unknown' : props.published.substring(0, 4)}</p>
                </div>
            </Link>
            <button
                onClick={props.handleSubmit}>Dodaj na półkę
            </button>
        </div>
    );
};
