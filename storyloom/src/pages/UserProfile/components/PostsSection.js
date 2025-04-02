import React from "react";
import "../../../styles/UserProfile.css";

const PostsSection = ({ posts }) => {
  return (
    <div className="posts-section">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post-item">
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default PostsSection;
