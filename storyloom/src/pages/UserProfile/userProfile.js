import React, { useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import ProfileTabs from "./components/ProfileTabs";
import BooksSection from "./components/BooksSection";
import PostsSection from "./components/PostsSection";
import "../../styles/UserProfile.css";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("books");

  const user = {
    profilePicture: "https://via.placeholder.com/150",
    username: "JohnDoe",
    country: "United States",
    bio: "Aspiring writer with a passion for fantasy and sci-fi. Exploring new worlds one word at a time.",
    books: [
      { title: "The Lost Kingdom", cover: "https://via.placeholder.com/100" },
      { title: "Space Chronicles", cover: "https://via.placeholder.com/100" },
    ],
    posts: [
      { id: 1, content: "Excited to release my new book soon!" },
      { id: 2, content: "Just finished a great fantasy novel. Any recommendations?" },
    ],
  };

  return (
    <div className="user-profile">
      <ProfileHeader user={user} />
      <hr />
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="tab-content">
        {activeTab === "books" && <BooksSection books={user.books} />}
        {activeTab === "posts" && <PostsSection posts={user.posts} />}
      </div>
    </div>
  );
};

export default UserProfile;
