import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // No user initially

  // Function to log in the user
  const login = async (username) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/profile/${username}`);
      const data = await response.json();

      if (response.ok) {
        setUser(data); // Store user data in context
        localStorage.setItem('username', data.username); // Store in local storage
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  // Function to log out the user
  // Logout function
  const logout = () => {
    setUser(null); // Clear user
  };


  // Check local storage for user session on page reload
  useEffect(() => {
    try {
      const storedUsername = localStorage.getItem("username");
      console.log("Retrieved username from localStorage:", storedUsername);
  
      if (storedUsername) {
        login(storedUsername);
      }
    } catch (err) {
      console.error("🔥 Error in useEffect:", err);
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
