import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import '../styles/navbar.css';
import { FaBook,FaCompass,FaPenNib ,FaSearch } from 'react-icons/fa';
import logo from '../assets/storyloom-navbar.png';
import shortlogo from '../assets/storyloomlogo.png';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';

function NavbarComponent() {
  const { user } = useContext(AuthContext);

  return (
    <Navbar bg="white" expand="lg" className="navbar">
      <div className="container">
        
        {/* Left Section: Logo + Browse + Create */}
        <div className="nav-left">
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="StoryLoom Banner Logo" className="navbar-logo" />
            <img src={shortlogo} alt="StoryLoom Logo" className="navbar-logo" />
          </Navbar.Brand>
          <Nav>
            <Link to="/browse" className="nav-link"><FaCompass/> Browse</Link>
            {user && <Link to="/create" className="nav-link"><FaPenNib/> Create</Link>}
          </Nav>
        </div>

        {/* Center Section: Search Bar */}
        <div className="nav-center">
          <Form className="navbar-search">
            <div className="search-container">
              <FormControl type="text" placeholder="Search Stories..." className="navbar-search-input" />
              <FaSearch className="search-icon" />
            </div>
          </Form>
        </div>

        {/* Right Section: Library + Profile */}
        <div className="nav-right">
          <Nav>
            {user && <Link to="/library" className="nav-link"><FaBook/> Library</Link>}
            {user ? (
              <Link to="/profile" className="nav-link">{user.username}'s Profile</Link>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </Nav>
        </div>

      </div>
    </Navbar>
  );
}

export default NavbarComponent;