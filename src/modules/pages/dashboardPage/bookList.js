import React from "react";
import {BookCard} from "./bookCard";

export const BookList = props => {
  return (
    <div className="list">
      {props.books.map((book, i) => (
        <BookCard key={i} image={book.volumeInfo.imageLinks.thumbnail} title={book.volumeInfo.title} author={book.volumeInfo.authors.join(', ')} published={book.volumeInfo.publishedDate} />
      ))}
    </div>
  );
};
