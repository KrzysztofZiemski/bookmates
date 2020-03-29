import React from 'react';
import './FilterBooks.scss';
import Slider from './Slider/Slider';

export const FilterBooks = ({ books, filterBy, onClick, id }) => {
    const options = {};
    books.forEach(book => {
        //todo 2 autorów
        if (!Array.isArray(books)) throw new Error('no Array type');
        if (Array.isArray(book[filterBy])) {
            book[filterBy].forEach(property => {
                options.hasOwnProperty(property) ? options[property].push(book) : options[property] = [book];
            })
        }
        else {

            options.hasOwnProperty(book[filterBy]) ? options[book[filterBy]].push(book) : options[book[filterBy]] = [book];
        }
    })

    let output = [];
    for (let option in options) {
        console.log(option === 'undefined')
        output.push(
            <div className="single-slider" key={option}>
                <h3>{option === 'not found' || option === 'undefined' ? 'Inne' : option}</h3>
                <div className="slider-books"> <Slider content={options[option]} onClick={onClick} id={id}></Slider></div>
            </div>
        )
    }
    //todo
    output = output.sort()
    return (
        <div className='slidersContainer'>{output}</div>
    )
}



// const BooksSliders = ({ publicUser }) => {

//     const getByCategories = () => {
//         const categories = {};
//         if (!publicUser) return;
//         if (!Array.isArray(publicUser.books)) return;
//         publicUser.books.forEach(book => {
//             if (book.hasOwnProperty('categories')) {
//                 book.categories.forEach(category => {
//                     categories.hasOwnProperty(category) ? categories[category].push(book) : categories[category] = [book];
//                 })
//             };
//         });
//         const output = [];
//         for (let category in categories) {
//             output.push(
//                 <div className="single-slider" key={category}>
//                     <h3>{category}</h3>
//                     <div className="slider-books"> <Slider content={categories[category]}></Slider></div>
//                 </div>
//             )
//         }
//         return output;
//     }
//     const booksByCategories = getByCategories();

//     return (
//         <div className="userBooksContainer">
//             <h2>Książki na półce</h2>
//             <div className="sliders-container">
//                 {booksByCategories}
//             </div>
//         </div>
//     )
// };