import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyStories() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchMyStories = async () => {
      try {
        const username = localStorage.getItem("username");
        const response = await fetch(`http://localhost:5000/api/auth/profile/${username}`);
        const data = await response.json();
        setBooks(data.books || []);
      } catch (error) {
        console.error("🛑 Failed to fetch stories:", error);
      }
    };

    fetchMyStories();
  }, []);

  return (
    <div className="my-stories">
      <h2>📚 My Stories</h2>
      <Link to="/create-story" className="create-btn">➕ Create New Story</Link>

      <div className="story-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="story-card" key={book._id}>
              📖 {book.title} 
              {/* ({book.published ? "Published" : "Unpublished"}) */}
            </div>
          ))
        ) : (
          <p>No stories yet... go spin some magic! ✨</p>
        )}
      </div>
    </div>
  );
}

export default MyStories;

