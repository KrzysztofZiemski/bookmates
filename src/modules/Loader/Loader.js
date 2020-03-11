import React from 'react';
import './Loader.scss';

export const Loader = () => {
    return (
        <div className="ui segment container-loader">
            <div className="ui active dimmer">
                <div className="ui text loader">Loading</div>
            </div>
            <p></p>
        </div>
    )
}