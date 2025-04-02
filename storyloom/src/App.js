import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import StoryDetails from './pages/StoryDetails';
import CreatePage from './pages/CreatePage';
// import Profile from './pages/Profile';
import CreateStory from './pages/CreateStory/CreateStory';
import UserProfile from './pages/UserProfile/userProfile';
// import CreateStory from './pages/CreateStory';
import { AuthProvider } from './auth/AuthContext';
import Regsiter from './pages/Registration';


function App() {
  return (
    <AuthProvider>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />  {/* ✅ Use 'element' instead of 'component' */}
          <Route path="/browse" element={<Browse />} />
          <Route path="/story/:id" element={<StoryDetails />} />
          <Route path="/register" element={<Regsiter />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/create-story" element={<CreateStory />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
