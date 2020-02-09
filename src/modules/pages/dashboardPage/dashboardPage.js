import React, {useState} from "react";
import {SearchArea} from "./searchArea";
import request from 'superagent';
import {BookList} from "./bookList";

const Dashboard = () => {
  let [books, setBooks] = useState([]);
  let [searchField, setSearchField] = useState('');
  let [sort, setSort] = useState('');

  const cleanData = (data) => {
    const cleanedData = data.body.items.map((book) => {
      if (!book.volumeInfo.hasOwnProperty('publishedDate')) {
        book.volumeInfo['publishedDate'] = '0000';
     }
      if (!book.volumeInfo.hasOwnProperty('imageLinks')) {
      book.volumeInfo['imageLinks'] = {thumbnail: 'http://vrephotels.com/images/NoImageFound.png'};
    }
      if (!book.volumeInfo.hasOwnProperty('authors')){
        book.volumeInfo['authors'] = ['not found'];
      }
      return book;


    });
    return cleanedData;
  };

  const searchBook = (e) => {
    e.preventDefault();
    request
        .get("https://www.googleapis.com/books/v1/volumes")
        .query({ q: searchField, maxResults: 20})
        .then(data => {
          console.log(data);
          setBooks(cleanData(data));
        });
  };
  // const searchBook = (e) => {
  //   e.preventDefault();
  //   request
  // .get("https://data.bn.org.pl/api/bibs.json")
  //       .query({title: searchField})
  //       .then(data => setBooks([data.bibs]));
  // }
  // const searchBook = (e) => {
  //   e.preventDefault();
  //   axios
  //       .get(`https://data.bn.org.pl/api/bibs.json?title=${searchField}`)
  //       .then(data => setBooks([...data.bibs]));
  // }

  const handleSearch = (e) => {
    setSearchField(e.target.value);
  }

  const handleSort= (e) => {
    console.log(e.target.value);
    setSort(e.target.value);
  };

const sortedBooks = books.sort((a, b) => {
    if (sort === 'Newest') {
      return parseInt(b.volumeInfo.publishedDate.substring(0,4)) - parseInt(a.volumeInfo.publishedDate.substring(0,4));
    }
  else if (sort === 'Oldest') {
    return parseInt(a.volumeInfo.publishedDate.substring(0,4)) - parseInt(b.volumeInfo.publishedDate.substring(0,4));
  }
});

  return (
      <div>
    <SearchArea handleSearch={handleSearch} searchBook={searchBook} handleSort={handleSort}/>
    <BookList books={sortedBooks}/>
  </div>
)};


export default Dashboard;
