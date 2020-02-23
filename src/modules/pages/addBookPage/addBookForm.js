import React, { useState } from "react";
import { Form, Input, Label } from "semantic-ui-react";
import ErrorMessage from "../registrationPage/errorMessage";

const AddBookForm = props => {
  const { addBookForm } = props;

  let [isbn, setISBN] = React.useState();
  let [title, setTitle] = React.useState("");
  let [authors, setAuthors] = React.useState("");
  let [publishedYear, setPublishedYear] = React.useState();
  let [imageURL, setImageURL] = React.useState("");
  let [description, setDescription] = React.useState("");

  let [errorISBN, setErrorISBN] = React.useState(null);
  let [errorTitle, setErrorTitle] = React.useState(null);
  let [errorAuthors, setErrorAuthors] = React.useState(null);
  let [errorPublishedYear, setErrorPublishedYear] = React.useState(null);
  let [errorImageURL, setErrorImageURL] = React.useState(null);
  let [errorDescription, setErrorDescription] = React.useState(null);


  const validateISBN = () => {
    if (isbn.length === 10 || isbn.length === 13) return setErrorISBN(false);
    setErrorISBN(true);
  };
  const validateTitle = () => {
    if (title.length > 1) return setErrorTitle(false);
    setErrorTitle(true);
  };
  const validateAuthors = () => {
    if (authors.length > 2) return setErrorAuthors(false);
    setErrorTitle(true);
  };

  const validatePublishedYear = () => {
    if (publishedYear.length === 4 && publishedYear > 1000)
      return setErrorPublishedYear(false);
    setErrorPublishedYear(true);
  };

    const validateImageURL = () => {
        if (!imageURL) return setErrorImageURL(false);
    };

    const validateDescription = () => {
        if (!description) return setErrorDescription(false);
    };


    const handleAddBook = async e => {
    e.preventDefault();
      const book = { isbn, title, authors, publishedYear, imageURL, description };

      addBookForm(book);

  };

  return (
    <form className="addBookForm" onSubmit={handleAddBook}>
      <Form.Field className={errorISBN ? "errorElementRegistration" : null}>
        <Label htmlFor="isbn">ISBN: </Label>
        <Input
          type="number"
          id="formISBN"
          onBlur={validateISBN()}
          onChange={(e, data) => setISBN(data.value)}
        />
        <ErrorMessage
          error={errorISBN}
          message={"ISBN powinien mieć 10 lub 13 znaków"}
        />
      </Form.Field>
      <Form.Field className={errorTitle ? "errorElementRegistration" : null}>
        <Label htmlFor="formTitle">Tytuł: </Label>
        <Input
          type="text"
          id="formTitle"
          onChange={(e, data) => setTitle(data.value)}
          onBlur={validateTitle}
        />
        <ErrorMessage
          error={errorTitle}
          message={"Podaj poprawny tytuł książki"}
        />
      </Form.Field>
      <Form.Field className={errorAuthors ? "errorElementRegistration" : null}>
        <Label htmlFor="formAuthors">Autorzy (po przecinku): </Label>
        <Input
          type="text"
          id="formAuthors"
          onChange={(e, data) => setAuthors(data.value)}
          onBlur={validateAuthors}
        />
        <ErrorMessage
          error={errorAuthors}
          message={"Podaj poprawnie autora/autorów"}
        />
      </Form.Field>
      <Form.Field
        className={errorPublishedYear ? "errorElementRegistration" : null}
      >
        <Label htmlFor="publishedYear">Rok publikacji: </Label>
        <Input
          type="number"
          id="formPublishedYear"
          onBlur={validatePublishedYear()}
          onChange={(e, data) => setPublishedYear(data.value)}
        />
        <ErrorMessage
          error={errorISBN}
          message={"Rok publikacji powinien mieć 4 znaki"}
        />
      </Form.Field>
      <Form.Field className={errorImageURL ? "errorElementRegistration" : null}>
        <Label htmlFor="formImageURL">URL obrazka: </Label>
        <Input
          type="url"
          id="formImageURL"
          onChange={(e, data) => setImageURL(data.value)}
          onBlur={validateImageURL}
        />
        <ErrorMessage
          error={errorImageURL}
          message={"Podaj poprawnie adres obrazka"}
        />
      </Form.Field>
      <Form.Field
        className={errorDescription ? "errorElementRegistration" : null}
      >
        <Label htmlFor="formDescription">Autorzy (po przecinku): </Label>
        <Input
          type="text"
          id="formDescription"
          onChange={(e, data) => setDescription(data.value)}
          onBlur={validateDescription}
        />
        <ErrorMessage
          error={errorDescription}
          message={"Podaj poprawnie opis książki"}
        />
      </Form.Field>
    </form>
  );
};

export default AddBookForm;