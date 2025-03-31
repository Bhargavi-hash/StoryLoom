import { Link } from "react-router-dom";

function MyStories() {
  return (
    <div className="my-stories">
      <h2>📚 My Stories</h2>
      <Link to="/create-story" className="create-btn">➕ Create New Story</Link>

      <div className="story-list">
        <div className="story-card">📖 The Lost Kingdom (Published)</div>
        <div className="story-card">📖 Shadows of Time (Unpublished)</div>
      </div>
    </div>
  );
}

export default MyStories;