import React, { Component } from "react";
import axios from "axios";
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import NavBar from "./components/NavBar.js"
import BookList from "./components/BookList.js"
import {
  HashRouter,
  Route
} from "react-router-dom";
// json-server --watch db.json --port 3001

class App extends Component {


  render() {

    return (
      <HashRouter>
        <div className="container">
          <Route path="/" exact     component={ NavBar } />
          <Route path="/firstPage"  component={ BookList } />
        </div>
      </HashRouter>
    );
  }
}

export default App;