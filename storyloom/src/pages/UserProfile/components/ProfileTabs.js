import React from "react";
import "../../../styles/UserProfile.css";

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      <button
        className={activeTab === "books" ? "active" : ""}
        onClick={() => setActiveTab("books")}
      >
        Books
      </button>
      <button
        className={activeTab === "posts" ? "active" : ""}
        onClick={() => setActiveTab("posts")}
      >
        Posts
      </button>
    </div>
  );
};

export default ProfileTabs;
