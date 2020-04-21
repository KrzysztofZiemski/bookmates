import React from 'react';
import './FilterBooks.scss';
import Slider from './Slider/Slider';


export const FilterBooks = ({ books, filterBy, onClick, id }) => {
    if (!Array.isArray(books)) throw new Error('no Array type');
    const options = {};
    books.forEach(book => {
        //todo 2 autorów
        if (Array.isArray(book[filterBy])) {
            console.log(book[filterBy])
            book[filterBy].forEach(property => {
                options.hasOwnProperty(property) ? options[property].push(book) : options[property] = [book];
            });
        } else {
            options.hasOwnProperty(book[filterBy]) ? options[book[filterBy]].push(book) : options[book[filterBy]] = [book];
        }
    });
    //zmiana obiektu na tablicę podwójnie zagnieżdżoną w celu możliwości sortowania po kluczu obiektu
    let optionsArr = [];
    for (let option in options) {
        optionsArr.push([option, options[option]]);
    }
    optionsArr.sort((a, b) => {
        if (a[0] > b[0]) return 1;
        return -1;
    });

    const output = optionsArr.map(option => {

        return (
            <div className="single-slider" key={option[0]}>
                <h3>{option[0] === 'not found' || option[0] === 'undefined' || option[0] === '0000' ? 'Brak' : option[0]}</h3>
                <div className="slider-books"><Slider content={option[1]} onClick={onClick} id={id}></Slider></div>
            </div>
        );
    });
    return (
        <div className='slidersContainer'>{output}</div>
    );
};
