import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username.trim()) {
      alert('Please enter a username.');
      return;
    }
    
    await login(username);  // Call login function from AuthContext
    // navigate(`/profile/${username}`); // Redirect to profile page
    navigate('/'); // Redirect to home page after login
  };

  return (
    <div>
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Enter your username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <button onClick={handleLogin}>Login</button>
        <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
};

export default Login;
