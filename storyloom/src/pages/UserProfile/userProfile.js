import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";

const Profile = () => {
  const { username } = useParams(); // Get username from URL
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/profile/${username}`);
        if (!response.ok) throw new Error("User not found");

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  const handleLogout = () => {
    logout(); // Call logout function
    navigate("/login"); // Redirect to login page
  };

  if (loading) return <p>Loading...</p>;
  if (!profileData) return <p>User not found</p>;

  return (
    <div>
      <h2>{profileData.username}'s Profile</h2>
      <p>User Type: {profileData.usertype}</p>
      <p>Country: {profileData.country}</p>
      <p>Bio: {profileData.bio}</p>
      <p>Books: {profileData.books.length}</p>
      <p>Posts: {profileData.posts.length}</p>
      <p>Followers: {profileData.followers.length}</p>
      <p>Following: {profileData.following.length}</p>

      {/* <img src={profileData.profilePic} alt="Profile" /> */}

      {user && user.username === profileData.username && (
        <button onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Profile;
