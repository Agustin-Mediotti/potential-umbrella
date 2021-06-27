import React, { Component } from "react";
import axios from "axios";
import NavBar from "./NavBar.js"
import Books from "./Books.js"

class BookList extends Component {


  render() {

    return (
        <div className="container">
          <NavBar />
          <Books />
        </div>
    );
  }
}

export default BookList;