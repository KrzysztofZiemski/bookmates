import React from "react";
import Slider from '../../Slider/Slider';
import './userPage.scss';

const BooksSliders = ({ publicUser }) => {
    const getByCategories = () => {
        const categories = {};
        if (!publicUser) return;
        if (!Array.isArray(publicUser.books)) return;
        publicUser.books.forEach(book => {
            if (book.hasOwnProperty('categories')) {
                book.categories.forEach(category => {
                    categories.hasOwnProperty(category) ? categories[category].push(book) : categories[category] = [book];
                })
            };
        });
        const output = [];
        for (let category in categories) {
            output.push(
                <div className="single-slider" key={category}>
                    <h3>{category}</h3>
                    <div className="slider-books"> <Slider content={categories[category]}></Slider></div>
                </div>
            )
        }
        return output
    }
    const booksByCategories = getByCategories();

    return (
        <div className="userBooksContainer">
            <h2>Książki na półce</h2>
            <div className="sliders-container">
                {booksByCategories}
            </div>
        </div>
    )
};

export default BooksSliders;
