import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return <h2>Please log in to view your profile.</h2>;

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Here you can see your books and update your profile.</p>
      <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
    </div>
  );
}

export default Profile;
