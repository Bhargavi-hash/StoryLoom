import React, { useContext } from 'react'; // Add useState when needed in future for search query
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import '../styles/navbar.css'; // Import the CSS file
import { FaSearch } from 'react-icons/fa'; // Import search icon
import logo from '../assets/storyloom-navbar.png'; // Path to your logo
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap'; // Use Bootstrap components

function NavbarComponent() {
  const { user } = useContext(AuthContext);

  return (
    <Navbar bg="white" expand="lg" className="navbar">
      <div className="container">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="StoryLoom Logo" className="navbar-logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/browse" className="nav-link">Browse</Link>
            {user && <Link to="/create" className="nav-link">Create</Link>}
            {user && <Link to="/library" className="nav-link">Library</Link>}
          </Nav>

          {/* Search Bar with Search Icon */}
          <Form className="navbar-search">
            <div className="search-container">
              <FormControl type="text" placeholder="Search Stories..." className="navbar-search-input" />
              <FaSearch className="search-icon" />
            </div>
          </Form>

          <Nav>
            {user ? (
              <Link to="/profile" className="nav-link">{user.username}'s Profile</Link>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavbarComponent;
