import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/browse">Browse</Link>
      {user && <Link to="/create">✍️ Create Story</Link>}
      {user ? <Link to="/profile">{user.username}'s Profile</Link> : <Link to="/profile">Login</Link>}
    </nav>
  );
}

export default Navbar;

