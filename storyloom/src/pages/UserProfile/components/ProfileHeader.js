import React from "react";
import "../../../styles/UserProfile.css";

const ProfileHeader = ({ user }) => {
  return (
    <div className="profile-header">
      <img src={user.profilePicture} alt="Profile" className="profile-pic" />
      <div className="profile-info">
        <h2>{user.username}</h2>
        <p>{user.country}</p>
        <p className="bio">{user.bio}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
