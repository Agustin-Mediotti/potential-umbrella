import React, { Component } from "react";
import axios from "axios";
import {
  Input,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Button,
} from "reactstrap";

// json-server --watch db.json --port 3001

class Books extends Component {
  state = {
    books: [],
    newBookData: {
      title: "",
      author: "",
      avaible: "",
    },
    editBookData: {
      id: "",
      title: "",
      author: "",
      avaible: "",
    },
    newBookModal: false,
    editBookModal: false,
  };
  UNSAFE_componentWillMount() {
    this._refreshBooks();
  }
  toggleNewBookModal() {
    this.setState({
      newBookModal: !this.state.newBookModal,
    });
  }
  toggleEditBookModal() {
    this.setState({
      editBookModal: !this.state.editBookModal,
    });
  }
  addBook() {
    axios
      .post("http://localhost:3001/books", this.state.newBookData)
      .then((response) => {
        let { books } = this.state;

        books.push(response.data);

        this.setState({
          books,
          newBookModal: false,
          newBookData: {
            title: "",
            author: "",
            avaible: "",
          },
        });
      });
  }
  updateBook() {
    let { title, author, avaible } = this.state.editBookData;

    axios
      .put("http://localhost:3001/books/" + this.state.editBookData.id, {
        title,
        author,
        avaible,
      })
      .then((response) => {
        this._refreshBooks();

        this.setState({
          editBookModal: false,
          editBookData: { id: "", title: "", author: "", avaible: "" },
        });
      });
  }
  editBook(id, title, author, avaible) {
    this.setState({
      editBookData: { id, title, author, avaible },
      editBookModal: !this.state.editBookModal,
    });
  }
  deleteBook(id) {
    axios.delete("http://localhost:3001/books/" + id).then((response) => {
      this._refreshBooks();
    });
  }
  _refreshBooks() {
    axios.get("http://localhost:3001/books").then((response) => {
      this.setState({
        books: response.data,
      });
    });
  }
  render() {
    let books = this.state.books.map((book) => {
      return (
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.avaible}</td>
          <td>
            <Button
              color="success"
              size="sm"
              className="mr-2"
              onClick={this.editBook.bind(
                this,
                book.id,
                book.title,
                book.author,
                book.avaible
              )}
            >
              Edit
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={this.deleteBook.bind(this, book.id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
    return (
      <div className="App container">
        <h1>Nadezhda</h1>

        <Button
          className="my-3"
          color="primary"
          onClick={this.toggleNewBookModal.bind(this)}
        >
          Add Book
        </Button>

        <Modal
          isOpen={this.state.newBookModal}
          toggle={this.toggleNewBookModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>
            Add a new book
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                id="title"
                value={this.state.newBookData.title}
                onChange={(e) => {
                  let { newBookData } = this.state;

                  newBookData.title = e.target.value;

                  this.setState({ newBookData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="author">Author</Label>
              <Input
                id="author"
                value={this.state.newBookData.author}
                onChange={(e) => {
                  let { newBookData } = this.state;

                  newBookData.author = e.target.value;

                  this.setState({ newBookData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="avaible">Avaible</Label>
              <Input
                id="avaible"
                value={this.state.newBookData.avaible}
                onChange={(e) => {
                  let { newBookData } = this.state;

                  newBookData.avaible = e.target.value;

                  this.setState({ newBookData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addBook.bind(this)}>
              Add Book
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleNewBookModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.editBookModal}
          toggle={this.toggleEditBookModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>
            Edit book
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                id="title"
                value={this.state.editBookData.title}
                onChange={(e) => {
                  let { editBookData } = this.state;

                  editBookData.title = e.target.value;

                  this.setState({ editBookData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="author">Author</Label>
              <Input
                id="author"
                value={this.state.editBookData.author}
                onChange={(e) => {
                  let { editBookData } = this.state;

                  editBookData.author = e.target.value;

                  this.setState({ editBookData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="avaible">Avaible</Label>
              <Input
                id="avaible"
                value={this.state.editBookData.avaible}
                onChange={(e) => {
                  let { editBookData } = this.state;

                  editBookData.avaible = e.target.value;

                  this.setState({ editBookData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateBook.bind(this)}>
              Update Book
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleEditBookModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Avaible</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>{books}</tbody>
        </Table>
      </div>
    );
  }
}

export default Books;
