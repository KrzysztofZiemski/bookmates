import React from 'react';

export const SearchAreaUser = props => {

    return (
        <div className="search-area">
            <form onSubmit={props.searchUser} action="">
                <input onChange={props.handleSearchUser} type="text" className="text"/>
                <button type="submit">Szukaj</button>
            </form>
        </div>

      
    )
}