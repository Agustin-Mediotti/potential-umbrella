import React, { useState } from 'react';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
 // Añadir
const NavBar = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div>
      <Nav pills>
        <NavItem>
          <NavLink href="/firstPage" active>Libros</NavLink>
        </NavItem>
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle nav caret>
            Registro Prestados
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Entradas</DropdownItem>
            <DropdownItem>Añadir</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Editar</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavItem>
          <NavLink href="#">Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Another Link</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}

export default NavBar;

