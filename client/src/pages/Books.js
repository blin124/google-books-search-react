import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron/index.js";
import JumbotronTitle from "../components/Jumbotron/Jumbotron";
import JumbotronRes from "../components/Jumbotron/JumboResult";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      })
        .then(res => {
          // context logic write here
          // call dispatch function here - which will trigger the reducer
                      // reducer will trigger state ew
          loadBooks()
        })
        .catch(err => console.log(err));
    } 
  };

    return (
      <Container fluid>
        <JumbotronTitle />
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Book Search</h1>
              <form>
                <Input
                  onChange={handleInputChange}
                  name="title"
                  placeholder="Title (required)"
                />
                <Input
                  onChange={handleInputChange}
                  name="author"
                  placeholder="Author (required)"
                />
                {/* <TextArea
                  onChange={handleInputChange}
                  name="synopsis"
                  placeholder="Synopsis (Optional)"
                /> */}
                <FormBtn
                  disabled={!(formObject.author && formObject.title)}
                  onClick={handleFormSubmit}
                >
                  Submit Book
                </FormBtn>
              </form>
            </Jumbotron>
            <JumbotronRes>
              <h1>Results</h1>
            </JumbotronRes>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Saved Books</h1>
            {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }


export default Books;