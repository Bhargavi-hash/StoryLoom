import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import StoryDetails from './pages/StoryDetails';
import Profile from './pages/Profile';
import CreateStory from './pages/CreateStory';
import { AuthProvider } from './auth/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />  {/* ✅ Use 'element' instead of 'component' */}
          <Route path="/browse" element={<Browse />} />
          <Route path="/story/:id" element={<StoryDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreateStory />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
