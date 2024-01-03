import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Offcanvas, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./NavBar.css"
import Amount from '../Amount/Amount';






function NavBar() {


  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <Link to='/' >
            <img src={`CoiniX.svg`} alt="brand img" className='brand' />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav_link">
              <Link className='link ' to="/">Home</Link>
              <Link className='link ' to="/profile">Profiles</Link>
              <Link className='link ' to="/deposit">Deposit</Link>
              <Link className='link ' to="/withdraw">Withdraw</Link>
              <Link className='link ' to="/contactus">Contact </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Amount />
    </>
  );

}

export default NavBar